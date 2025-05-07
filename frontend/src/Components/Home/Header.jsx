import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthModal from "../Modals/AuthModal";
import AuthService from "../../Services/AuthService";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const isAuthenticated = AuthService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);
    };
    
    // Check on component mount
    checkLoginStatus(); 
    
    // Add event listener to detect localStorage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Also check every time the component is focused
    window.addEventListener('focus', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('focus', checkLoginStatus);
    };
  }, []);
  
  const authButtonClicked = () => {
    if (isLoggedIn) {
      navigate("/community"); // Navigate to community if logged in
    } else {
      setIsAuthModalOpened(true); // Open the login modal if not logged in
    }
  };
  
  const handleAuthSuccess = () => {
    setIsAuthModalOpened(false);
    setIsLoggedIn(true); // Set logged in state to true after successful login
    navigate("/"); // Redirect to /community
  };
  
  return (
    <header className={`header ${isLoggedIn ? 'header--logged-in' : ''}`}>
      <Navbar />
      <div className="section__container">
        <div className="header__container">
          <div className="header__content">
            <h1>UNLEASH YOUR CREATIVITY</h1>
            <h2>SEW. SHARE. INSPIRE.</h2>
            <p>
            Join a vibrant community of sewing enthusiasts and creators. 
            Discover new projects, share your handmade masterpieces, 
            learn expert techniques, and connect with fellow sewists from around the world.
            </p>
            <div className="header__btn">
              <button className="btn btn__primary" onClick={authButtonClicked}>
                {isLoggedIn ? "CALL | TO ACTION" : "START YOUR JOURNEY"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="motivation-banner">
        <p>"Sewing is an art that brings fabric and thread to life." <strong>- Unknown</strong></p>
      </div>
      
      <AuthModal
        onClose={() => {
          setIsAuthModalOpened(false);
        }}
        onSuccess={handleAuthSuccess} // Pass success handler to AuthModal
        isOpen={isAuthModalOpened}
      />
    </header>
  );
};

export default Header;