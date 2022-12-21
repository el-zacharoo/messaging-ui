import { useEffect } from "react";


export const GetUser = (setPerson: Function) => {
    useEffect(() => {
        const getPerson = async () => {
            const token = localStorage.getItem('access_token');
            const resp = await fetch(`https://${import.meta.env.VITE_AUTH_DOMAIN}/userinfo`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                }
            });

            const data = await resp.json();
            if (resp.ok) {
                setPerson(data);
                console.log(data)

            }
        }
        getPerson();
    }, [setPerson])
}