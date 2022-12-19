import { useState, useEffect } from "react"

import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Fields = {
    [key: string]: string;
}

const MessageBox = () => {
    const [fields, setFields] = useState<Fields>({
        messages: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFields((prev: any) => {
            prev[name] = value
            return { ...prev };
        });
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2 }}>
                <Stack spacing={1}>
                    <MessageBubble >
                        hello
                    </MessageBubble>
                    {fields?.messages &&
                        <MessageBubble message={true}>
                            {fields?.messages}
                        </MessageBubble>
                    }
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row">
                    <TextField variant="standard" name="messages" onChange={handleInputChange} fullWidth label={!fields?.messages && "Type a message..."} multiline size="small" />
                    <IconButton color="primary">
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Card>
        </Container>
    )
}
export default MessageBox

type MessageBubbleProps = {
    children: React.ReactNode;
    message?: boolean;
}

type Color = {
    text: string;
    background: string;
}

const MessageBubble = (props: MessageBubbleProps) => {
    const { children, message } = props;
    const [colour, setColour] = useState<Color>({
        text: "",
        background: "grayText"
    })

    useEffect(() => {
        if (message) {
            setColour({
                text: "white",
                background: "primary.main"
            })
        }
    }, [message])

    return (
        <Box sx={{ borderRadius: 2, p: 1, backgroundColor: colour.background, maxWidth: '60%' }} >
            <Typography sx={{ color: colour.text }}>
                {children}
            </Typography>
        </Box>
    )
}