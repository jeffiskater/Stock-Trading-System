import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Stock from './Stock';
import Analysis from "./Analysis";

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <Link
                    className="App-link"
                    to="/stock"
                >
                    Learn React
                </Link>
            </header>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/analysis/:ticker" element={<Analysis />} />
            </Routes>
        </Router>
    );
}

export default App;
