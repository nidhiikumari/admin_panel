import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Signin from './components/auth/signin';
import Index from './components/home';
import AddMember from './components/AddMember';
import EditMember from './components/edit';
import BlockedList from './components/BlockedList';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem('Email');
    const password = localStorage.getItem('Password');
    if (!email && !password) {
      navigate('/signin');
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/add-member' element={<AddMember />} />
        <Route exact path='/' element={<Index />} />
        <Route exact path='/edit' element={<EditMember />} />
        <Route exact path='/bocked-members' element={<BlockedList />} />
      </Routes>
    </div>
  );
}

export default App;
