import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";

const api: string = import.meta.env.VITE_AUTH_API;

const SignIn = () => {
    const [error, setError] = useState<string>("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        grant_type: "password",
        audience: import.meta.env.VITE_AUTH_AUDIENCE
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
        setError("");
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const resp = await fetch(`${api}/SignIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    authUserSignIn: credentials
                })
            })
            const data = await resp.json();
            if (resp.ok) {
                localStorage.setItem('access_token', data.accessToken);
                localStorage.setItem('id_token', data.idToken);
                localStorage.setItem('expires_in', data.expiresIn);
                window.location.href = '/';
            }
        }
        catch {
            setError("Failed to log in");
        }
    }

    return (
        <Dialog open={true} maxWidth="md">
            {error}
            <Grid sx={{ p: 2 }} spacing={2} container>
                <Grid xs={12}>
                    <TextField fullWidth label="Email" name="username" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <TextField type="password" fullWidth name="password" label="Password" onChange={onChange} />
                </Grid>
                <Grid xs={12}>
                    <Button onClick={(e: any) => onSubmit(e)} variant="contained">Sign In</Button>
                </Grid>
            </Grid>
        </Dialog>
    )

}
export default SignIn