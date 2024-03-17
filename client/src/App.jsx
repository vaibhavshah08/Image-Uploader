import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SignIn from './pages/Signin';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AllImages from './pages/AllImage';

export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element={<About />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/all-images' element={<AllImages/>} />
      </Route>
    </Routes>
  </BrowserRouter>
}
