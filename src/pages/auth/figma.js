import React from 'react';
import api from "../../API";

const FigmaAuth = () => {
  const authenticationSuccess = async () => {
      if (window.Trello.token() !== "Token request rejected") {
        console.log('Successful authentication');
        sessionStorage.setItem('token', window.Trello.token());
        try {
            const userInfo = await api.getUserInfos(window.Trello.token());
            sessionStorage.setItem('info', JSON.stringify(userInfo));
            window.location.href = "/figma1";
        } catch (error) {
            console.error('Error fetching user information:', error);
            sessionStorage.clear();
        }
      } else {
        console.log('Failed authentication');
      }
  };


  const authenticationFailure = () => {
      console.log('Failed authentication');
  };

    const handleLogin = () => {
      return window.Trello.authorize({
        type: 'popup',
        name: 'Getting Started Application',
        scope: {
            read: true,
            write: true
        },
        expiration: '1day',
        success: authenticationSuccess,
        error: authenticationFailure,
    });
  };

  return (
    <div className="flex justify-center items-center px-16 py-12 w-full h-screen text-2xl font-medium text-center bg-zinc-300 grow-0 sm:px-5">
      <div className="flex flex-col justify-center px-12 py-10 mt-72 max-w-full bg-white rounded-3xl w-[492px] sm:px-5 sm:mt-10">
        <div className="self-center text-black whitespace-nowrap">
          Connection to Trello
        </div>
        <div className="mt-16 text-xl sm:mt-10">
          If you want to use this application, first create an account on{' '}
          <a href="https://trello.com/" className="text-blue-700" target="_blank" rel="noopener noreferrer">
          Trello
          </a>
        </div>
        <button
          className="flex justify-center p-2.5 mt-16 text-white whitespace-nowrap bg-indigo-600 rounded-3xl sm:mt-10 hover:bg-blue-800"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}


export default FigmaAuth