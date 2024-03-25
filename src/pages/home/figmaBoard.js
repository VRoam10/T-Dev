import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../API";
import { ErrorMessage, Footer, Header } from "../../components/general";
import { ListContainer, InputCreateList } from '../../components/lists';

function Board() {
  const id = useLocation().pathname.slice(8);

  const [lists, setLists] = useState([]);
  const [boardInfos, setBoardInfos] = useState({});
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [listLoad, setLoadList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lists
        const fetchedLists = await api.getAllLists(id);
        setLists(fetchedLists);

        // Fetch board information
        const boardInfo = await api.getBoardById(id);
        setBoardInfos(boardInfo);

        // Fetch organization members
        const organizationId = sessionStorage.getItem('organization');
        const fetchedMembers = await api.getOrganizationMembers(organizationId);
        setMembers(fetchedMembers);
        setLoadList(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [listLoad]);

  const deleteError = () => {
    setError(null);
  }

  return (
    <div className='w-full h-full'>
      <div className="flex flex-col bg-white h-dvh">
        <Header isBoard={true} boardInfo={boardInfos} />
        <div className="pt-2.5 pb-12 px-9 w-full min-h-[600px] h-dvh shadow-lg bg-zinc-300 max-md:px-5 max-md:max-w-full overflow-auto">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {lists && lists.length >= 1 && lists.map((list, indexList) => (
              <ListContainer handleReload={setLoadList} key={indexList} list={list} members={members} lists={lists}></ListContainer>
            ))}
            <InputCreateList handleReload={setLoadList} boardId={id} />
          </div>
        </div>
        <Footer />
        {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
      </div>
    </div>
  );
}

export default Board;