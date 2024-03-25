import React, { useEffect, useRef, useState } from "react";
import api from "../../API";
import { CustomModal, ErrorMessage, Footer, Header, InputField } from "../../components/general";
import { BoardContainer, ButtonCreateBoard } from "../../components/boards";
import { ButtonCreateWorkspace } from "../../components/workspaces";

function WorkspacePage() {
  const userInfo = JSON.parse(sessionStorage.getItem('info'));

  const [organizations, setOrganizations] = useState([]);
  const [orgaId, setOrgaId] = useState("");
  const [boards, setBoards] = useState([]);
  const [boardsLoad, setLoadBoards] = useState(false);
  const [userLoad, setLoadUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrganizations = async () => {
      if (!userLoad) {
        try {
          const fetchOrganisation = await api.getUserOrganizations(userInfo.id);
          setOrganizations(fetchOrganisation);
          setLoadUser(true);
        } catch (error) {
          setError(error);
        }
      }
    };

    const fetchBoards = async () => {
      try {
        const result = await api.getAllBoards(orgaId);
        setBoards(result);
        return (result.length)
      } catch (error) {
        setError(error);
      }
    };

    if (orgaId && boardsLoad) {
      fetchBoards();
      setLoadBoards(false);
    }

    fetchUserOrganizations();
  }, [userInfo, userLoad, boardsLoad]);

  const deleteError = () => {
    setError(null);
  }

  const WorkspaceContainer = ({ children, organizationId, idMemberCreator }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [renameOrga, setRenameOrga] = useState("");
    const dropdownRef = useRef(null);

    const handleOpenModal = (event) => {
      event.stopPropagation();
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(true)
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if ((dropdownRef.current && !dropdownRef.current.contains(event.target))) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });

    const clickOnOptions = (event) => {
      event.stopPropagation();
      toggleDropdown();
    };

    const handleChangeOrganization = (organizationId) => {
      console.log(organizationId);
      setOrgaId(organizationId);
      sessionStorage.setItem('organization', organizationId);
      setLoadBoards(true);
    };

    const handleChangeNameOrga = async (event) => {
      event.preventDefault();
      try {
        await api.renameWorkspace(organizationId, renameOrga);
        handleCloseModal();
        setRenameOrga(null);
        setLoadUser(false);
      } catch (error) {
        setError(error);
      }
    }

    const handleDelete = async () => {
      try {
        await api.deleteOrganization(organizationId);
        const fetchOrganisation = await api.getUserOrganizations(userInfo.id);
        setOrganizations(fetchOrganisation);
        setLoadUser(false);
      } catch (error) {
        setError(error);
      }
    };

    const canDeleteOrganization = (organizationId) => {
      return userInfo.id === organizationId;
    };

    const stopPropagation = (event) => {
      event.stopPropagation();
    }

    return (
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div onClick={() => handleChangeOrganization(organizationId)} className="flex flex-col grow px-2.5 pt-2.5 pb-12 mx-auto w-full text-2xl text-black whitespace-nowrap rounded-xl border border-black border-solid max-md:mt-2.5 cursor-pointer">
          <div className="flex gap-3 justify-between relative" ref={dropdownRef}>
            <div className="grow">{children}</div>
            <button onClick={clickOnOptions} className="self-start text-center leading-[62.5%]">...</button>
            {isOpen && (
              <ul onClick={stopPropagation} className={`z-40 absolute top-full mt-2 py-2 w-48 bg-white text-black shadow-xl rounded-md ${!document.documentElement.clientWidth || window.innerWidth > document.documentElement.clientWidth - dropdownRef.current.getBoundingClientRect().right ? 'right-0' : 'left-0'}`}>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleOpenModal}>Modifier</li>
                {canDeleteOrganization(idMemberCreator) && (<li className="px-4 py-2 bg-red-600 hover:bg-red-800 cursor-pointer" onClick={handleDelete}>Suppression</li>)}
              </ul>
            )}
          </div>
        </div>
        <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <form
            onSubmit={handleChangeNameOrga}
            className="box-border flex relative flex-col shrink-0 space-y-6"
          >
            <InputField
              id="Organisation-Name"
              label="Organisation Name"
              value={renameOrga}
              onChange={(event) => setRenameOrga(event.target.value)}
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
    )
  }

  return (
    <div className="flex flex-col bg-white h-dvh">
      <Header isBoard={false} />
      <div className="flex flex-col px-2.5 py-12 w-full bg-zinc-300 max-md:max-w-full">
        <div className="flex flex-wrap gap-y-2.5 gap-5 justify-between content-start p-2.5 mt-12 w-full bg-white rounded-3xl max-md:mt-10 max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {organizations.map((organization) => (
                <WorkspaceContainer key={organization.id} organizationId={organization.id} idMemberCreator={organization.idMemberCreator}>
                  {organization.displayName}
                </WorkspaceContainer>
              ))}
            </div>
          </div>
          <ButtonCreateWorkspace />
        </div>
        <div className="flex-wrap content-start py-2.5 pr-20 pl-2.5 mt-5 mb-12 bg-white rounded-3xl max-md:pr-5 max-md:mb-10 max-md:max-w-full">
          <div className={`flex gap-5 max-md:flex-col max-md:gap-0 overflow-auto ${orgaId ? '' : 'invisible'}`}>
            <ButtonCreateBoard handleReload={setLoadBoards} organizationId={sessionStorage.getItem("organization")} boards={boards} />
            {boards && boards.map((board) => (
              <BoardContainer handleReload={setLoadBoards} key={board.id} boardId={board.id}>{board.name}</BoardContainer>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
    </div>
  );
}

export default WorkspacePage;