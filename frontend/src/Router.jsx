import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Account from './user/Account';
import OperationTeams from './OperationPages/OperationTeams';
import UserManagement from './admin/UserManagement';
import About from './pages/About';
import MyOperation from './OperationPages/MyOperation';
import IncrementalOperation from './OperationPages/IncrementalOperation';
import CheckUser from './OperationPages/CheckUser';
import SalesOperationDaily from './OperationPages/SalesOperationDaily';
import SalesOperationIncremental from './OperationPages/SalesOperationIncremental';
import SalesIncrementalTeams from './OperationPages/SalesIncrementalTeams';

export default function Router(theme) {

    return (
        <Routes>
            <Route path="/" element={<CheckUser theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} />
            <Route path="/dailyOperation" element={<MyOperation theme={theme} />} />
            <Route path="/incrementalOperation" element={<IncrementalOperation theme={theme} />} />
            <Route path="/dailySalesOperation" element={<SalesOperationDaily theme={theme} />} />
            <Route path="/incrementalSalesOperation" element={<SalesOperationIncremental theme={theme} />} />
            <Route path="/incrementalSalesOperationTeams" element={<SalesIncrementalTeams theme={theme} />} />
            <Route path="/operationTeams" element={<OperationTeams theme={theme} />} />
            <Route path="/centralizedOperation" element={<UserManagement theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/SignUp" element={<SignUp theme={theme} />} />
            <Route path="/account" element={<Account theme={theme} />} />
        </Routes>
    )
}