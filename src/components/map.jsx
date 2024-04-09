import db from '../firebase-config.js';
import { collection, getDocs } from "firebase/firestore";
import dateFormat from 'dateformat';
import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import AddButton from './add-button.jsx';
import SelectLocation from './select-location.jsx';
import AddMemory from './add-memory.jsx';
import Popup from 'reactjs-popup';
import Welcome from './welcome.jsx';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const porto = { lng: -8.611, lat: 41.1496};
    const [zoom] = useState(14);
    const [markerList, setMarkers] = useState([]);
    const [selectingLocation, setSelectingLocation] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [newMarkerLocation, setNewMarkerLocation] = useState(null );
    const [justOpned, setJustOpened] = useState(true);


 

    maptilersdk.config.apiKey = 'AKNXxEpqqCCn0Ygdr5ge';

    useEffect(() => {
        if (map.current) return; 
      
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: 'https://api.maptiler.com/maps/4b454022-9191-419c-9330-d97103648ff1/style.json?key=AKNXxEpqqCCn0Ygdr5ge',
          center: [porto.lng, porto.lat],
          zoom: zoom,
          navigationControl: false
        });
        getMarkers();


      
      }, [porto.lng, porto.lat, zoom]);

    
    function addLocation() {
        if (selectingLocation === false){
            setSelectingLocation(true);

            map.current.on('click', function (e) {
                console.log("ADD THE MARKER");
                setNewMarkerLocation([e.lngLat.lng, e.lngLat.lat]);
                setShowPopup(true);
            });

        }
        
    }


    function finishRequest() {
        setNewMarkerLocation(null);
        setSelectingLocation(false);
        
        setShowPopup(false);
        console.log("FINISH REQUEST");
        getMarkers();
        console.log(selectingLocation);
        console.log(showPopup);


    }



    const addMarkersMap = () => {
        markerList.forEach((marker) => {
            const current_date = marker.date.toDate();
            const date = dateFormat(current_date, "dd/mm/yyyy");

            const popupDiv = document.createElement('div');
            popupDiv.className = 'popup';
            popupDiv.innerHTML = '<div class="popup-title">' + marker.title + '</div>' + '<div class="popup-date">' + date + '<\div>' + '<div class="popup-description">' + marker.description + '</div>' ;

            var popup = new maptilersdk.Popup({ offset: 25}).setDOMContent(popupDiv);
        
            var el = document.createElement('div');
            el.id = 'marker';
        
            const location = [marker.location._long, marker.location._lat]
            new maptilersdk.Marker({color: "#d5ff87"})
            .setLngLat(location)
            .setPopup(popup)
            .addTo(map.current);
        });
        };


    useEffect(() => {
        addMarkersMap();
        }, [markerList]);



    const getMarkers = async () => {
        try {
          setMarkers([]);
          const markersCollection = collection(db, 'markers');
          const querySnapshot = await getDocs(markersCollection);
          var markers = [];
          querySnapshot.forEach((doc) => {
            markers.push({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                date: doc.data().date,
                location: doc.data().location
            });
          });

        setMarkers(markers);
        
        } catch (error) {
          console.error('Error getting documents: ', error);
          throw error; 
        }
      };



    return (
        <div>
            <div className="map-wrap">
                <div ref={mapContainer} className="map" />
            </div>
            {selectingLocation ? 
                <SelectLocation />
                :  <AddButton addLocation = {addLocation} />
            }
            {justOpned ?
                <Popup
                    open={justOpned} 
                    onClose={() => setJustOpened(false)} 
                    closeOnDocumentClick={false} 
                >
                    {(close) => <Welcome close={close} />}
                </Popup>
                : null
            }
            {showPopup && selectingLocation ?<Popup
                open={showPopup} 
                onClose={() => finishRequest()} 
                closeOnDocumentClick={false} 
            >
                {(close) => <AddMemory close={close} location={newMarkerLocation} />}
            </Popup>
            : null}      

        </div>
        );
      
  }
