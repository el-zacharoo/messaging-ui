import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resp = await fetch(`https://${import.meta.env.VITE_AUTH_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'password',
                username: email,
                password: password,
                audience: import.meta.env.VITE_AUTH_AUDIENCE,
                client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
                client_secret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
            })
        })

        if (resp.ok) {
            const data = await resp.json();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('id_token', data.id_token);
            localStorage.setItem('expires_in', data.expires_in);
            navigate("/");
        }
    }

    return (
        <Dialog open={true} maxWidth="md">
            <Grid sx={{ p: 2 }} spacing={2} container>
                <Grid xs={12}>
                    <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid xs={12}>
                    <TextField fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid xs={12}>
                    <Button onClick={(e: any) => onSubmit(e)} variant="contained">Sign In</Button>
                </Grid>
            </Grid>
        </Dialog>
    )

}
export default SignIn