import { useAuth0, User } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AccountInfo = () => {
    const { user }: User = useAuth0();

    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={user.picture} alt={`${user.nickname}'s avatar`} />}
                    title={user.nickname}
                />
                <CardContent>
                    <Stack divider={<Divider />}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                            <Typography>Email:</Typography>
                            <Typography>{user.email}</Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    )
}
export default AccountInfo
