// import { useEffect, createRef } from "react"
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";

const Map = ({markerArr, serviceId}) => {
  const Client = ({ text }) => <div onClick={handleClick} >{text}</div>
  const navigateService = useNavigate()

  const handleClick = () => {

    navigateService(`/services/${serviceId}`)
  }
  
  const defaultProps = {
      center: {
        lat: 45.48412,
        lng: -73.631813
      },
      zoom: 11
    };
  
    return (
      <div style={{ height: '70vh', width: '50%',
      display: "inline-block", marginLeft: "400px" }}>
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