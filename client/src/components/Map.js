import { useContext } from "react"
import { CurrentRequestContext } from "./CurrentRequestContext";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";
import markerImage from "../assets/logo-house.png"

const Map = ({markerArr}) => {
  const navigateService = useNavigate()
  const {setService} = useContext(CurrentRequestContext);

  // Add clients addresses as markers to the map.
  const ClientMarker = ({ text, id, item }) =>
    <div
    onClick={()=> {navigateService(`/services/${id}`)
    setService(item)}}>
    <img src={markerImage} height={50} width={50} />
    {text}</div>

  const defaultProps = {
      center: {
        lat: 45.48412,
        lng: -73.631813
      },
      zoom: 10
    };
  
    return (
      <div style={{ height: '80vh', width: '45%',
        display: "flex", float:"right" ,  marginLeft: "10px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA11X2WyanHuFT08dv3TE_C4HXsfQl7BR4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markerArr.map((item )=> (
          <ClientMarker 
          lat={item.lat} lng={item.lng} text={item.text} id={item.id} item={item.item}
          />
          ))}
        </GoogleMapReact>
      </div>
    );
  }   

export default Map;