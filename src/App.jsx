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
import Error from './Pages/Error.jsx';
import EventView from './Pages/EventView.jsx';
import Account from './Pages/Account.jsx';
import ProfileSettings from './Pages/ProfileSettings.jsx';
import AccountChangePass from './Pages/AccountChangePass.jsx';
import SavedEvents from './Pages/SavedEvents.jsx';
import AddEvent from './Pages/AddEvent.jsx';
import EventsContext from './components/EventsContext.jsx';
import Notifications from './Pages/Notifications.jsx';
import MyEvents from './Pages/MyEvents.jsx';
import ListerEventView from './Pages/ListerEventView.jsx';
import ForgotPass from './Pages/ForgotPass.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () =>{
  return(
    <>
      <Infobar/>
      <Navbar/>
        <Routes>
          <Route exact path='/eventBazaar/' element={<Home/>}/>
          <Route exact path='/eventBazaar/login' element={<Login/>}/>
          <Route exact path='/eventBazaar/signup' element={<Signup/>}/>
          <Route exact path='/eventBazaar/about' element={<About/>}/>
          <Route exact path='/eventBazaar/contact' element={<Contact/>}/>
          <Route exact path='/eventBazaar/account' element={<Account/>}/>
          <Route exact path='/eventBazaar/savedEvents' element={<SavedEvents/>}/>
          <Route exact path='/eventBazaar/notifications' element={<Notifications/>}/>
          <Route exact path='/eventBazaar/addEvent' element={<EventsContext> <AddEvent/> </EventsContext>}/>
          <Route exact path='/eventBazaar/myevents' element={<MyEvents/>}/>
          <Route exact path='/eventBazaar/profilesettings' element={<ProfileSettings/>}/>
          <Route exact path='/eventBazaar/changepassword' element={<AccountChangePass/>}/>
          <Route exact path='/eventBazaar/forgotpassword' element={<ForgotPass/>}/>
          <Route exact path='/eventBazaar/events/:eventName' element={<EventView/>}/>
          <Route exact path='/eventBazaar/listerEvents/:eventName' element={<ListerEventView/>}/>
          <Route exact path='/eventBazaar/termsandconds' element={<TermsAndConds/>}/>
          <Route exact path='/eventBazaar/privacypolicy' element={<PrivacyPolicy/>}/>
          <Route path='/eventBazaar/*' element={<Error/>}/>
        </Routes>
      <Footer/>
      <Preloader/>
      {/* reactToasity */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        />
    </>
  );
}
export default App;