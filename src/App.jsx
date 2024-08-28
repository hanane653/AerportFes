import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NavBarOne from './components/NavBarOne/NavBarOne';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Support from './components/Support/Support';
import Info from './components/Info/Info';
import EmbedForm from './components/EmbedForm/EmbedForm';
import Travelers from './components/Travelers/Travelers';
import Subscribers from './components/Subscribers/Subscribers';
import Footer from './components/Footer/Footer';
import Maps from './components/Maps/Maps';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { TranslationProvider } from './context/TranslationContext';
import { AuthProvider } from './AuthContext';
import BookingPage from './components/Booking/BookingPage';
import ContactUs from './components/ContactUs/ContactUs';


const App = () => {
  const [showAuth, setShowAuth] = useState(null); // null, 'login', or 'signup'

  const handleAuthClick = (type) => {
    setShowAuth(type);
  };

  return (
    <AuthProvider>
      <TranslationProvider>
      <Router>
          <div>
            <div className="navBarOneWrapper flex">
              <NavBarOne />
              <LanguageSelector />
            </div>
            <Navbar />

          

          {/* Always visible components 
          <Home />
          <Search />
          <Support />
          <Info />
          <EmbedForm />
          <Travelers />
          <Subscribers />
          <Maps />
          <Footer />*/}
           {/* Auth routes - they will be rendered in place of other content */}
           <Routes>
           <Route path="/" element={
                <>
                  <Home />
                  <Search />
                  <Support />
                  <Info />
                  <EmbedForm />
                  <Travelers />
                  <Subscribers />
                  <Maps />
                  <ContactUs />
                  
                  
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
            <Footer />
        </div>
        </Router>
      </TranslationProvider>
    </AuthProvider>
  );
};

export default App;
