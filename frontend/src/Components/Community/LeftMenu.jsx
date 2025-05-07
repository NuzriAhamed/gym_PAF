import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import { Link } from 'react-router-dom';

const LeftMenu = () => {
  const snap = useSnapshot(state);
  
  const handleClick = (index) => {
    state.activeIndex = index;
  };
  
  // Main navigation items
  const mainNavItems = [
    "Posts",
    "Sewing Plans",
    "Learning Tracking",
    "Friends",
    "Notifications",
  ];
  
  // Shortcut items
  const shortcutItems = [
    "Gallery",
    "Videos"
  ];

  return (
    <div className="left-menu">
      <div className="left-menu-header">
      <img src="../assets/logo.png" alt="" />
        <h3 className="left-menu-title">Sewist</h3>
      </div>
      
      {/* Main navigation */}
      <ul className="left-menu-list">
        {mainNavItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`left-menu-item ${snap.activeIndex === index + 1 ? "active" : ""}`}
          >
            <a href="#" className="left-menu-link">
              {item}
            </a>
            {snap.activeIndex === index + 1 && (
              <div className="left-menu-active-indicator" />
            )}
          </li>
        ))}
      </ul>
      
      {/* Shortcuts section */}
      <div className="left-menu-shortcuts">
        <h4 className="left-menu-section-title">Your Shortcuts</h4>
        <ul className="left-menu-list">
          {shortcutItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(mainNavItems.length + index + 1)}
              className={`left-menu-item ${snap.activeIndex === mainNavItems.length + index + 1 ? "active" : ""}`}
            >
              <a href="#" className="left-menu-link">
                {item}
              </a>
              {snap.activeIndex === mainNavItems.length + index + 1 && (
                <div className="left-menu-active-indicator" />
              )}
            </li>
          ))}
        </ul>
        <Link to="/">
        <button className="btn btn__primary at_bottom">
                HOME
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftMenu;