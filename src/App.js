import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/login';
import User_Dashboard  from './pages/User_Dashboard';
import About from './pages/About';
import SetupProfile from './pages/SetupProfile';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='user/:username' element={<User_Dashboard />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />}/>
            <Route path='setupProfile' element={ <SetupProfile />}/>
            <Route path='*' element={<h2>Page not found</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
