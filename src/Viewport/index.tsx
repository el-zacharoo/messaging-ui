import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Footer from "./Footer";
import Header from "./Header";

interface ViewportProps {
    children: React.ReactNode;
}

const Viewport = (props: ViewportProps) => {
    const { children } = props;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <Header />
            <Container sx={{ my: 10 }} maxWidth="lg">
                {children}
            </Container>
            <Footer />
        </Box>
    )
}
export default Viewport