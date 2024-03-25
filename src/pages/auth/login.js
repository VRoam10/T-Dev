import React, { useEffect } from 'react';
import api from "../../API";

const LoginPage = () => {
    const authenticationSuccess = async () => {
        console.log('Successful authentication');
        sessionStorage.setItem('token', window.Trello.token());
        try {
            const userInfo = await api.getUserInfos(window.Trello.token());
            sessionStorage.setItem('info', JSON.stringify(userInfo));
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
        window.location.href = "/Workspace";
    };


    const authenticationFailure = () => {
        console.log('Failed authentication');
    };

    const auth = () => {
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

    useEffect(() => {
        auth();
    }, []);

    return (
        <button onClick={() => auth()}>Login</button>
    );
};

export default LoginPage;
