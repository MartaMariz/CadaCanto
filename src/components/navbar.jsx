import React from 'react';
import './navbar.css';
import logo from '../imgs/title-green.png';

export default function Navbar(){
  return (
    <div className="heading">
        <img src={logo} width={'180px'} alt="logo image" ></img>
    </div>
  );
}