import React from 'react';
import './popup.css';

export default function Welcome(props) {
    const message = 'Decoramos juntas a vida. Acrescentamos ao nosso mundo imaginário pelo puro prazer de amar e ser feliz. Do nada em cada canto e esquina desta cidade existe um pedacinho de nós. Imagens nítidas de memórias lindas que merecem ser relembradas e eternizadas.';

    return (
        <div className='modal'>
           
            <div className="header"> Bem vinda ao nosso Porto! </div>
            <div className="content">
                {message}
            </div>
            <div className="actions">
                <button onClick={props.close}>Explorar!</button>
            </div>
        </div>
    );
};

