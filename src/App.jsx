import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyGroups from './pages/MyGroups';
import UserDetails from './pages/UserDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateGroup from './pages/CreateGroup';
import Transactions from './components/Transactions';
import Group from './pages/Group';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import GroupEdit from './components/GroupEdit';
import UpdateTransaction from './components/UpdateTransaction';


function App() {
  const { theme } = useTheme();
  document.body.className = theme;
  return (
    <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/group/:id/create-transaction" element={<Transactions />} />
            <Route path="/group/:id" element={<Group />} />
            <Route path="/group/:id/edit" element={<GroupEdit />} />
            <Route path="/group/:id/edit/transaction/:transactionId" element={<UpdateTransaction />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/my-groups" element={<MyGroups />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </SessionProvider>
  );
}

export default App;