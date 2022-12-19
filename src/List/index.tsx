import { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

type Messages = {
    cursor: Message[];
    matches: number;
}

type Message = {
    id: string;
    messages: MessageBody[];
}

type MessageBody = {
    body: string;
    date: string;
}

const url = import.meta.env.VITE_API_URL;

const List = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<Messages>({
        cursor: [],
        matches: 0
    });

    useEffect(() => {
        const fetchList = async () => {
            const resp = await fetch(`${url}/Query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    searchText: ""
                })
            })
            if (resp.ok) {
                const data = await resp.json()
                setMessages(data)
                setLoading(false)
            }
        }
        fetchList();
    }, []);

    return (
        <>
            <Typography variant="h3">Current chats</Typography>
            {loading &&
                <Skeleton height={200} />
            }
            {!loading && messages &&
                <>
                    {messages.cursor?.map((msg: Message, index: number) =>
                        <div key={index}>
                            <Typography >{msg.id}</Typography>
                        </div>
                    )}
                    {messages.matches}
                </>
            }
        </>
    )
}
export default List