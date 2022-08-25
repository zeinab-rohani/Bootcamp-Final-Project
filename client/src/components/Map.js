import { useEffect, createRef } from "react"
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>

const markerArr = [
  { lat:45.5008243 , lng:-73.7955473 , text: "Home" }
]

const Map = () => {
    const defaultProps = {
        center: {
          lat: 45.48412,
          lng: -73.631813
        },
        zoom: 11
      };
    
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA11X2WyanHuFT08dv3TE_C4HXsfQl7BR4" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={45.5008243} lng={-73.7955473} text= "Home" />
          </GoogleMapReact>
        </div>
      );
    }
    


export default Map;