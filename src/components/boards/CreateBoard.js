import React, { useEffect, useState } from "react";
import api from "../../API";
import { CustomModal, ErrorMessage, InputField } from "../../components/general";

const ButtonCreateBoard = ({ organizationId, boards, handleReload }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [boardName, setboardName] = useState("");
    const [boardDescription, setboardDescription] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(0)
    const [templates, setTemplates] = useState({});
    const [leftBoards, setLeftBoards] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (isModalOpen) {
                setTemplates(await api.getTemplates())
                const maxBoards = await api.fetchMaxBoardsInOrganization(sessionStorage.getItem('organization'));
                if (maxBoards === "unlimited") {
                    setLeftBoards("unlimited")
                } else {
                    setLeftBoards(maxBoards - boards.length)
                }
            }
        }

        fetchData();
    }, [isModalOpen]);

    const handleOpenModal = () => {
        setModalOpen(true);

    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCreateBoard = async (event) => {
        event.preventDefault();
        if (selectedTemplate == 0) {
            try {
                await api.createBoardInOrganization(organizationId, boardName, boardDescription);
                handleCloseModal();
                setboardName(null);
                setboardDescription(null);
                handleReload(true);
            } catch (error) {
                setError(error);
            }
        } else {
            try {
                await api.createBoardFromExistingInOrganization(organizationId, selectedTemplate, boardName);
                handleCloseModal();
                setboardName(null);
                handleReload(true);
            } catch (error) {
                setError(error);
            }
        }
    };

    const deleteError = () => {
        setError(null);
    }

    return (
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full ">
            <button onClick={handleOpenModal} className="justify-center px-6 h-full w-full text-2xl text-center text-white whitespace-nowrap rounded-3xl bg-black border border-black border-solid max-md:px-5 max-md:pt-10 max-md:mt-5">
                Créer un nouveau tableau
            </button>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                {leftBoards !== 'unlimited' && <h2>Number of allowed board left : {leftBoards}</h2>}
                <select onChange={(e) => setSelectedTemplate(e.target.value)}>
                    <option value={0}>Select a template</option>
                    {templates && Object.values(templates).map((template, indexTemplate) => (
                        <option key={indexTemplate} value={template.id}>
                            {template.name}
                        </option>
                    ))}
                </select>
                <form
                    onSubmit={handleCreateBoard}
                    className="box-border flex relative flex-col shrink-0 space-y-6"
                >
                    <InputField
                        id="Board-Name"
                        label="Board Name"
                        value={boardName}
                        onChange={(event) => setboardName(event.target.value)}
                    />
                    {selectedTemplate == 0 && <InputField
                        id="Board-Description"
                        label="Board Description"
                        value={boardDescription}
                        onChange={(event) => setboardDescription(event.target.value)}
                    />}

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

export default ButtonCreateBoard;