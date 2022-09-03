import { useContext } from "react"
import { CurrentRequestContext } from "./CurrentRequestContext";
import GoogleMapReact from "google-map-react";
import { useNavigate } from "react-router-dom";

const Map = ({markerArr}) => {

  const navigateService = useNavigate()
  const {setService} = useContext(CurrentRequestContext);

  const Client = ({ text, id, item }) => <div
  onClick={()=> {navigateService(`/services/${id}`)
  setService(item)}}>{text}</div>
  console.log("markerArr", markerArr)  

  const defaultProps = {
      center: {
        lat: 45.48412,
        lng: -73.631813
      },
      zoom: 9
    };
  
    return (
      <div style={{ height: '70vh', width: '50%',
      display: "inline-block", marginLeft: "400px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA11X2WyanHuFT08dv3TE_C4HXsfQl7BR4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markerArr.map((item )=> (
          <Client 
          lat={item.lat} lng={item.lng} text={item.text} id={item.id} item={item.item}
          />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
    

export default Map;