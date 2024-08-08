import React from 'react';
// packages import
import { Route, Routes } from 'react-router-dom';
// bootsrap css import
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// bootsrap js import
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// custom css import
import './App.css';
// components import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Infobar from './components/Infobar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import TermsAndConds from './Pages/TermsAndConds.jsx';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Preloader from './components/Preloader.jsx';

const App = () =>{
  return(
    <>
      <Infobar/>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
          <Route exact path='/termsandconds' element={<TermsAndConds/>}/>
          <Route exact path='/privacypolicy' element={<PrivacyPolicy/>}/>
        </Routes>
      <Footer/>
      <Preloader/>
    </>
  );
}
export default App;