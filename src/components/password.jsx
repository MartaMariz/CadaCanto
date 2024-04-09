import React, { useState } from 'react';
import './popup.css';

export default function PasswordPopup(props){

    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('') 


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleAccept = () => {
        if (password === 'asaraefixe') {
            props.setSelecting();
            props.close();
            setErrorMessage('');
        } else {
            setErrorMessage('Password errada! Tenta outra vez!');
        }
    };

    return (
        <div className='modal'>
            <button className="close" onClick={props.close}>
                x
        </button>
            <div className="header"> Só a Sara e a Marta é que podem adicionar!! </div>
            <div className="content">
                Insere a password para adicionar uma memória!
                
            </div>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password secretíssima"
            />
            <div style={{ height: '20px', overflow: 'hidden' }}>
                {errorMessage === '' ? null : 
                    <span style={{ 
                        fontWeight: 'bold', 
                        color: '#fbb7d5', 
                    }}>{errorMessage}</span>} 
            </div>
           
            <div className="actions">
                <button onClick={handleAccept}>Aceitar</button>
            </div>
            
        </div>
    );
};

