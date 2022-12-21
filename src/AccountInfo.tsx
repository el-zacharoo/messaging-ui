import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { GetUser } from '@/auth/getUser';

const AccountInfo = () => {
    const [person, setPerson] = useState<any>();

    GetUser(setPerson);

    return (
        <Stack spacing={2}>
            {person &&
                <Card>
                    <CardHeader
                        avatar={<Avatar src={person.picture} alt={`${person.nickname}'s avatar`} />}
                        title={person.nickname}
                    />
                    <CardContent>
                        <Stack divider={<Divider />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                <Typography>Email:</Typography>
                                <Typography>{person.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                <Typography>Name:</Typography>
                                <Typography>{`${person.given_name} ${person.family_name}`}</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            }
        </Stack>
    )
}
export default AccountInfo
