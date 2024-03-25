import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "../../styles/error/style.scss";
import api from "../../API";

const HomeLayout = () => {
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [leftBoards, setLeftBoards] = useState(null);
    const [renameOrga, setRenameOrga] = useState("");
    const [templates, setTemplates] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    useEffect(() => {
        const fetchData = async () => {

            try {
                setTemplates(await api.getTemplates())
                const result = await api.getAllBoards(sessionStorage.getItem('organization'));
                setBoards(result);
                const maxBoards = await api.fetchMaxBoardsInOrganization(sessionStorage.getItem('organization'));
                let info = JSON.parse(sessionStorage.getItem('info'))
                setUserInfo(info)
                if (maxBoards === "unlimited"){
                    setLeftBoards("unlimited")
                } else {
                    setLeftBoards(maxBoards - boards.length)
                }
            } catch (error) {
                console.error("Error while fetching data:", error)
                window.Trello.deauthorize();
                sessionStorage.clear();
                window.location.href = "/login";
            }
        }

        fetchData()

    }, []);

    const handleCreateBoard = async () => {
        try {
            await api.createBoard(boardName, boardDescription);
            window.location.reload()
        } catch (error) {
            console.error('Error while creating card:', error);
        }
    };

    const handleCreateBoardTemplate = async (boardName) => {
        if (selectedTemplate !== null) {
            try {
                await api.createBoardFromExisting(selectedTemplate, boardName);
            } catch (error) {
                console.error('Error while creating board:', error);
            }
        } else {
            alert('Select a template');
        }
    };


    const handleDisconnect = async () => {
        window.Trello.deauthorize();
        sessionStorage.clear();
        window.location.href = "/login";
    };

    const handleRedirectOrganization = () => {
        window.location.href = "/Workspace";
    };

    const handleChangeNameOrga = async () => {
        try {
            await api.renameWorkspace(sessionStorage.getItem('organization'), renameOrga);
            sessionStorage.setItem('organizationName', renameOrga)
            window.location.reload()
        } catch (error) {
            console.error('Error while renaming workspace:', error);
        }
    }


    return (
        <>
            <nav style={{textAlign: 'right'}}>
                <button style={{marginTop: 5}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleDisconnect}>Disconnect
                </button>
                <button style={{marginTop: "1vh", marginLeft:"3vw", marginRight:"2vw"}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleRedirectOrganization}>Change Workspace
                </button>
            </nav>
            <h1 style={{fontSize: '8vmin', textAlign: 'center', margin: "2vh"}}>
                Workspace : {sessionStorage.getItem('organizationName')}</h1>
            <input style={{
                        border: 'solid', borderRadius: 10,
                        marginLeft: '1vw', marginBottom: '2vh', marginRight: '1vw',
                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                    }}type="text"
                onChange={e => setRenameOrga(e.target.value)}
            />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleChangeNameOrga}>Change name of current workspace
            </button>

            <div style={{fontSize:"3vmin"}}
                className="flex flex-col px-12 py-5 mt-16 w-full text-2xl text-white whitespace-nowrap bg-zinc-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-row flex-wrap gap-2.5 justify-between mr-6 max-md:mr-2.5 max-md:max-w-full">
                    {boards && boards.map((board, index) => (
                        <div key={index}
                             className="justify-center py-4 pr-14 pl-5 rounded-2xl bg-stone-400 max-md:px-5">
                            <Link to={`/${board.id}`}>
                                <button>{board.name}</button>
                            </Link>
                        </div>
                    ))}
                    <div>
                        <div className="text-black justify-center py-4 pr-14 pl-5 rounded-2xl bg-stone-400 max-md:px-5">
                            <select onChange={(e) => setSelectedTemplate(e.target.value)}>
                                <option value={null}>Select a template</option>
                                {templates && Object.values(templates).map((template, indexTemplate) => (
                                    <option key={indexTemplate} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                            <input style={{
                                        border: 'solid', borderRadius: 10,
                                        marginLeft: '1vw', marginBottom: '2vh', marginRight: '1vw',
                                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                                    }}
                                type="text"
                                placeholder="Board Name"
                                onChange={e => setBoardName(e.target.value)}
                            />
                            <button onClick={()=>handleCreateBoardTemplate(boardName)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Create board from Template
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop:"5vh", marginBottom: "3vh", display: 'flex', alignItems:"center", justifyContent: 'space-around'}}>
                <input style={{
                        border: 'solid', borderRadius: 10,
                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                    }}
                    type="text"
                    placeholder="Board Name"
                    value={boardName}
                    onChange={e => setBoardName(e.target.value)}
                />
                <input style={{
                        border: 'solid', borderRadius: 10,
                        paddingLeft: '0.5vw', paddingRight: '0.5vw',
                    }}
                    type="text"
                    placeholder="Board Description"
                    value={boardDescription}
                    onChange={e => setBoardDescription(e.target.value)}
                />
                <button onClick={()=>handleCreateBoard()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Create
                    Board
                </button>
                
            {userInfo && userInfo.userInfo && <p>{userInfo.userInfo}</p>}
            {leftBoards !== 'unlimited' && <h2>Number of allowed board left : {leftBoards}</h2>}
            </div>
            <Outlet/>
        </>
    );
};

export default HomeLayout;
