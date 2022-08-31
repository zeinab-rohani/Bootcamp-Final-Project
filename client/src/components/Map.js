import { useEffect, createRef } from "react"
import GoogleMapReact from "google-map-react";
import { useContext, useState } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";

const Map = ({markerArr}) => {
  const Client = ({ text }) => <div onClick={handleClick} >{text}</div>
  const navigateServices = useNavigate()

  const handleClick = () => {
        navigateServices("/profile")
  }
  
    const defaultProps = {
        center: {
          lat: 45.48412,
          lng: -73.631813
        },
        zoom: 11
      };
    
      return (
        <div style={{ height: '80vh', width: '80%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA11X2WyanHuFT08dv3TE_C4HXsfQl7BR4" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {markerArr.map(mark => (
            <Client 
            lat={mark.lat} lng={mark.lng} text={mark.text} 
            />
            ))}
          </GoogleMapReact>
        </div>
      );
    }
    


export default Map;