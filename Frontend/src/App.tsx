import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FaultDiagnosis from './pages/FaultDiagnosis';
import Analytics from './pages/Analytics';
import Controls from './pages/Controls';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fault-diagnosis" element={<FaultDiagnosis />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/controls" element={<Controls />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;