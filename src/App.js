
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
        <Route path='/dashboard' element={isAuth && <DashBoard />} />
        <Route path='/loanform' element={<LoanForm />} />
        <Route path='/registers' element={<Register auth={setAuth} />} />
        <Route path='/user-reg' element={<UserRegister auth={setAuth} />} />
        <Route path='/admindash' element={isAuth && < Dashboard />} />
        <Route path='/superdash' element={isAuth && <SuperDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
