import React from 'react';
import addButton from '../imgs/add-button.png'; 
import Popup from 'reactjs-popup';
import './add-button.css';
import PasswordPopup from './password';

export default function AddButton( props){


    const setSelecting = () => {
        props.addLocation();
    }

    return (
        <Popup trigger= {<div className='add'> <img src={addButton} alt="my image" /></div>}  modal
        nested>
                  {(close) => <PasswordPopup close={close} setSelecting={setSelecting}  />}
        </Popup>
    );
};

