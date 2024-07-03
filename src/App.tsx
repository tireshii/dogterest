import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Content from "./components/content";
import LikedDogs from "./components/likeddogs";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/liked">Liked Dogs</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/liked" element={<LikedDogs />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;