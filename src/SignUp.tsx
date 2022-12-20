import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [values, setValues] = useState({
        given_name: '',
        family_name: '',
        email: '',
        nickname: '',
        password: '',
        'client_id': import.meta.env.VITE_AUTH_CLIENT_ID,
        'connection': 'Username-Password-Authentication',
    });

    const navigate = useNavigate();

    const signUp = async () => {
        const resp = await fetch(`https://${import.meta.env.VITE_AUTH_DOMAIN}/dbconnections/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        if (resp.ok) {
            navigate("/")
        }
        else {
            console.log(resp)
        }
    }


    return (
        <Dialog maxWidth="md" open={true}  >

            <Grid sx={{ p: 2 }} spacing={2} container>
                <Grid xs={12}>
                    <Typography variant="h3">Sign Up</Typography>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField size="small" label="Given Names" fullWidth type="text" name="givenName" onChange={(e) => setValues({ ...values, given_name: e.target.value })} />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField size="small" label="Family Name" fullWidth type="text" name="familyName" onChange={(e) => setValues({ ...values, family_name: e.target.value })} />
                </Grid>
                <Grid xs={12}>
                    <TextField size="small" label="Username" fullWidth type="text" name="nickname" onChange={(e) => setValues({ ...values, nickname: e.target.value })} />
                </Grid>
                <Grid xs={12}>
                    <TextField size="small" label="Email" fullWidth type="text" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} />
                </Grid>
                <Grid xs={12}>
                    <TextField size="small" label="Password" fullWidth type="password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} />
                </Grid>
                <Grid xs={12}>
                    <LoadingButton onClick={() => signUp()} >Sign Up</LoadingButton>

                </Grid>
            </Grid>


        </Dialog >
    )

}

export default SignUp;
