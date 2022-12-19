import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Box component="footer"
            sx={{ display: "flex", justifyContent: "center", py: 5, px: 2, mt: 'auto' }}>
            <Copyright />
        </Box>
    );
}

export default Footer;

const Copyright = () => {
    return (
        <Typography variant="body2" >
            {'Copyright © '}
            <Link underline="none" href="https://zachs-website.netlify.app/" >
                Messaging
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}