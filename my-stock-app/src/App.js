import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Stock from './Stock';
import Analysis from "./Analysis";
import Dashboard from './Dashboard'
import Ticker from './Ticker'
import Summary from "./Summary";

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                </p>
                <Link
                    className="App-link"
                    to="/dashboard"
                >
                    go to dashboard now !
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/:ticker" element={<Ticker />} />
                <Route path="/:summary" element={<Summary />} />
            </Routes>
        </Router>
    );
}

export default App;
