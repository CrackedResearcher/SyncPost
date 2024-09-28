import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Intro from './pages/intro'; // Import your Intro component here
import { Routes, Route } from 'react-router-dom';
import CollectInfo from './pages/CollectInfo.jsx';
import RunTool from './pages/runTool.jsx';
import Guide from './pages/guide.jsx';
import Callback from './pages/Callback.jsx';

const Main = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/info" element={<CollectInfo />} />
      <Route path="/open" element={<RunTool />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);