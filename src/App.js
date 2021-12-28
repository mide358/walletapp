import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';

import Login from './components/Login';
import Wallet from './components/Wallet';
import TransferConfirmation from './components/TransferConfirmation';
import { DataProvider } from './context/DataContext';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <DataProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transfer" element={<TransferConfirmation />} />
        </Routes>
        <Footer />
      </DataProvider>
    </Router>
  );
}

export default App;
