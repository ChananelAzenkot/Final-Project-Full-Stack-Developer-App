import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Account from './user/Account';
import Cards from './CardsPages/Cards';
import OperationTeams from './CardsPages/OperationTeams';
import UserManagement from './admin/UserManagement';
import About from './pages/About';
import CreateOperation from './CardBusiness/CreateOperation';
import MyOperation from './CardsPages/MyOperation';
import IncrementalOperation from './CardsPages/IncrementalOperation';

export default function Router(theme) {
    return (
        <Routes>
            <Route path="/" element={<Cards theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} />
            <Route path="/operationTeams" element={<OperationTeams theme={theme} />} />
            <Route path="/dailyOperation" element={<MyOperation theme={theme} />} />
            <Route path="/incrementalOperation" element={<IncrementalOperation theme={theme} />} />
            <Route path="/centralizedOperation" element={<UserManagement theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/SignUp" element={<SignUp theme={theme} />} />
            <Route path="/account" element={<Account theme={theme} />} />
            <Route path="/create-operation" element={<CreateOperation theme={theme} />} />
        </Routes>
    )
}