import React, { useState } from "react";
import api from "../../API";
import { CustomModal, ErrorMessage, InputField } from "../../components/general";

const BoardContainer = ({ children, boardId, handleReload }) => {
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [boardName, setBoardName] = useState("");

    const handleOpenModal = (event) => {
        event.stopPropagation();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeleteBoardClick = async (event) => {
        event.stopPropagation();
        try {
            await api.deleteBoard(boardId);
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    };

    const handleRenameBoard = async (event) => {
        event.preventDefault();
        try {
            await api.renameBoardById(boardId, boardName);
            handleCloseModal();
            setBoardName(null);
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    }

    const deleteError = () => {
        setError(null);
    }

    const handleBoardClick = () => {
        window.location.href = "figma2/" + boardId;
    };

    return (
        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
            <a
                onClick={handleBoardClick}
                className="flex flex-col px-2.5 pt-2.5 pb-7 mx-auto w-full text-2xl text-center text-white whitespace-nowrap rounded-3xl bg-black border border-black border-solid max-md:mt-5"
            >
                <div className="flex gap-5 justify-between p-2.5">
                    <div className="flex-auto">{children}</div>
                    <button onClick={handleOpenModal}>...</button>

                </div>
                <button
                    onClick={handleDeleteBoardClick}
                    className="self-end mt-28 w-8 h-8 bg-red-600 rounded-[90px] max-md:mt-10"
                />
            </a>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <form
                    onSubmit={handleRenameBoard}
                    className="box-border flex relative flex-col shrink-0 space-y-6"
                >
                    <InputField
                        id="Board-Name"
                        label="Board Name"
                        value={boardName}
                        onChange={(event) => setBoardName(event.target.value)}
                    />

                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>
            </CustomModal>
        </div>
    );
};

export default BoardContainer;