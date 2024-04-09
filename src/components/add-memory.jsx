import * as React from 'react';
import { useState } from 'react';
import db from '../firebase-config.js';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { doc, setDoc, Timestamp, GeoPoint  } from "firebase/firestore"; 

import './add-memory.css';


export default function AddMemory(props){
    const [date, setDate] = useState(dayjs()); // Set initial date to today's date

    const [markerInfo, setMarkerInfo] = useState({
        title: '',
        description: '',
    });

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMarkerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.location[1], props.location[0]);
        setDoc(doc(db, "markers", markerInfo.title ), {
            title: markerInfo.title,
            description: markerInfo.description,
            location: new GeoPoint(props.location[1], props.location[0]),
            date: Timestamp.fromDate(date.toDate())          }).then(() => {
            console.log("Document successfully written!");
            props.close();
            }
            ).catch((error) => {
                console.error("Error writing document: ", error);
            });
    };

    return (
        <div className="modal">
            <button className="close" onClick={props.close}>
                x
            </button>
            <div className="header"> Cria uma memória! </div>
            <div className="content">
                Novas memórias lindas!! Conta toda a história do acontecimento para ficar guardado no mapa!
            </div>

                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="title">Dá um nome à memória:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={markerInfo.title}
                        onChange={handleInputChange}
                    />
                    <label>Quando é que foi?</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} defaultValue={dayjs('2022-04-17')}>
                        <DatePicker 
                            inputProps={{ sx: { backgroundColor: 'white', }, }}
                            slotProps={{
                                day: {
                                sx: {
                                    "&.MuiPickersDay-root.Mui-selected": {
                                    backgroundColor: '#fbb7d5',
                                    },
                                },
                                },
                            }}

                            id="date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            
                            />
                    </LocalizationProvider>
                    <br />
                    <label htmlFor="description">Escreve uma descrição para ler mais tarde:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={markerInfo.description}
                        onChange={handleInputChange}
                    ></textarea>

                    <button type="submit">Adicionar memória!</button>
                </form>
        </div>
    );
};
