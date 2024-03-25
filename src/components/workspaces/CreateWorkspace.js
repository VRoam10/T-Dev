import React, { useState } from "react";
import api from "../../API";
import { CustomModal, ErrorMessage, InputField } from "../../components/general";

const ButtonCreateWorkspace = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [orgaName, setOrgaName] = useState("");
    const [orgaDesc, setOrgaDesc] = useState("");
    const [error, setError] = useState(null);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.createOrganization(orgaName, orgaDesc);
            handleCloseModal();
            setOrgaName(null);
            setOrgaDesc(null);
        } catch (error) {
            setError(error);
        }
    };

    const deleteError = () => {
        setError(null);
    }

    return (
        <div>
            <button
                title="Add New"
                class="group cursor-pointer outline-none hover:rotate-90 duration-300"
                onClick={handleOpenModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="97px"
                    height="97px"
                    viewBox="0 0 24 24"
                    class="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                >
                    <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke-width="1.5"
                    ></path>
                    <path d="M8 12H16" stroke-width="1.5"></path>
                    <path d="M12 16V8" stroke-width="1.5"></path>
                </svg>
            </button>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <form
                    onSubmit={handleSubmit}
                    className="box-border flex relative flex-col shrink-0 space-y-6"
                >
                    <InputField
                        id="Organisation-Name"
                        label="Organisation Name"
                        value={orgaName}
                        onChange={(event) => setOrgaName(event.target.value)}
                    />
                    <InputField
                        id="Organisation-Description"
                        label="Organisation Description"
                        value={orgaDesc}
                        onChange={(event) => setOrgaDesc(event.target.value)}
                    />

                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>
            </CustomModal>
            {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
        </div>
    )
}

export default ButtonCreateWorkspace;