import React, { useState, useEffect } from 'react';
import api from "../../API";

const Workspace = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('info'));

    const [organizations, setOrganizations] = useState([]);
    const [orgaName, setOrgaName] = useState("");
    const [orgaDesc, setOrgaDesc] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchOrganisation = await api.getUserOrganizations(userInfo.id);
                setOrganizations(fetchOrganisation);
            } catch (error) {
                console.error("Error fetching organisations", error);
            }
        };

        fetchData()
    }, [userInfo]);

    const handleChangeOrganization = (organizationId, organizationName) => {
        sessionStorage.setItem('organization', organizationId);
        sessionStorage.setItem('organizationName', organizationName)
        window.location.href = "/none";
    };

    const canDeleteOrganization = (organizationId) => {
        return userInfo.id === organizationId;
    };

    const handleSubmit = async () => {
        try {
            await api.createOrganization(orgaName, orgaDesc);
            const fetchOrganisation = await api.getUserOrganizations(userInfo.id);
            setOrganizations(fetchOrganisation);
        } catch (error) {
            console.error("Error creating organization", error);
        }
    };

    const handleDelete = async (organizationId) => {
        try {
            await api.deleteOrganization(organizationId);
            const fetchOrganisation = await api.getUserOrganizations(userInfo.id);
            setOrganizations(fetchOrganisation);
        } catch (error) {
            console.error("Error deleting organization", error);
        }
    };


    const handleDisconnect = async () => {
        window.Trello.deauthorize();
        sessionStorage.clear();
        window.location.href = "/login";
    };



    return (
        <>
            <button style={{
                marginLeft: '90vw', marginTop: '1vh',
            }}
             className="bg-blue-700 hover:bg-black text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleDisconnect}>Disconnect</button>
            <ul style={{
                marginLeft: '2vw', marginRight: '2vw', marginTop: '2vh', marginBottom: '4vh',
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>
                {organizations.map((organization, index) => (
                    <li style={{marginRight: '3vw'}} key={index}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={() => handleChangeOrganization(organization.id, organization.displayName)}>
                            {organization.displayName}
                        </button>
                        {canDeleteOrganization(organization.idMemberCreator) && (
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleDelete(organization.id)}>
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div style={{fontSize: '3vmin',marginLeft: '4vw',}}>
                <label>

                    Workspace Name:
                    <input style={{
                        border: 'solid', borderRadius: 10,
                        marginLeft: '1vw', marginBottom: '2vh',
                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                    }} type="text" value={orgaName} onChange={(e) => setOrgaName(e.target.value)} required/>

                </label>
            </div>
            <div style={{fontSize: '3vmin', marginLeft: '4vw',}}>
                <label>

                    Workspace Description:
                    <input style={{
                        border: 'solid', borderRadius: 10,
                        marginLeft: '1vw', marginBottom: '2vh',
                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                    }} type="text" value={orgaDesc} onChange={(e) => setOrgaDesc(e.target.value)} />
                </label>
            </div>
            <button style={{marginLeft: '10vw', marginTop: '5vh'}} onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Create new Organization</button>
        </>
    );
};

export default Workspace;
