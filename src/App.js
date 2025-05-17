
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Login from './components/Entreprenur/Login';
import Header from './components/Header';
import { useState } from 'react';
import DashBoard from './components/Entreprenur/DashBoard';
import LoanForm from './components/Entreprenur/LoanForm';
import Register from './components/Register';
import UserRegister from './components/UserRegister';
import Dashboard from './components/Admin/Dashboard';
import SuperDashboard from './components/SuperAdmin/SuperDashBoard';
import HomePage from './components/HomePage';

function App() {

  let [isAuth, setAuth] = useState(false)
  console.log(isAuth)
  return (
    <div>
      {isAuth && <Header />}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user-login' element={<Login auth={setAuth} />} />
        <Route path='/dashboard' element={isAuth ? <DashBoard /> : <Navigate to='/user-login' />} />
        <Route path='/loanform' element={<LoanForm />} />
        <Route path='/registers' element={<Register />} />
        <Route path='/user-reg' element={<UserRegister />} />
        <Route path='/admindash' element={isAuth ? < Dashboard /> : <Navigate to='/user-login' />} />
        <Route path='/superdash' element={isAuth ? <SuperDashboard /> : <Navigate to='/user-login' />} />
      </Routes>
    </div>
  );
}

export default App;
