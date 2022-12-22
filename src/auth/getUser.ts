import { useEffect } from "react";

export const GetUser = (setPerson: Function) => {
    useEffect(() => {
        const getPerson = async () => {
            const token = localStorage.getItem('access_token');
            const resp = await fetch(`http://localhost:8082/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ "access_token": token }),

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