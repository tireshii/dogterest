import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Link as MuiLink } from '@mui/material';
import Content from './components/content';
import LikedDogs from './components/likeddogs';

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dog App
                    </Typography>
                    <nav>
                        <MuiLink component={Link} to="/" color="inherit" underline="none" sx={{ p: 1 }}>
                            Home
                        </MuiLink>
                        <MuiLink component={Link} to="/liked" color="inherit" underline="none" sx={{ p: 1 }}>
                            Liked Dogs
                        </MuiLink>
                    </nav>
                </Toolbar>
            </AppBar>
            <Container sx={{ pt: 4 }}>
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/liked" element={<LikedDogs />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;