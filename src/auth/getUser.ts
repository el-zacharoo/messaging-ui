import { useEffect } from "react";

export const GetUser = (setPerson: Function) => {
    const api = import.meta.env.VITE_AUTH_API;
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            return;
        }
        const getPerson = async () => {
            const resp = await fetch(`${api}/GetAccount`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ "access_token": token }),
            });

            const data = await resp.json();
            if (resp.ok) {
                setPerson(data?.userInfo);
            }
        }
        getPerson();
    }, [api, setPerson, token])
}