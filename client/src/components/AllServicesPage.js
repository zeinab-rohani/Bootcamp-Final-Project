import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import { Loading } from "./Loading";

const DisplayServices = () => {
    const [markerArr, setMarkerArr] = useState([
    {
        lat: null,
        lng: null,
        text: "client"
    }
    ]);
    const [loading, setLoading] = useState(false);
    const {setService, services, setServices,
    setServiceProviders } = useContext(CurrentRequestContext);

    const navigateService = useNavigate()
    
    // get all availables services and display on the table and on the map.
    useEffect(() => {
        const getServiceProviders = async () => {
            setLoading(true);
            const res = await fetch("/api/companies");
            const { data } = await res.json();
            setServiceProviders(data);
            setLoading(false);
            };
                getServiceProviders();
                fetch("/api/services")
            .then((response) => response.json())
            .then((data) => data.data.map((item) => {
                if(!item.isConfirmed){
            setMarkerArr((markerArr)=>[
                ...markerArr,
                {
                    item: item,
                    id : item._id,
                    lat: item.addressPositionLat,
                    lng: item.addressPositionLng,
                    text: "client"
                }
            ])}
            setServices(data.data)
            setLoading(false);
            }))
    }, []);
console.log("services", services)
        return(
        <>
        <Wrapper>    
        {loading ? (
        <Loading />
        ) : (
        <section>
        <ServicesSection> 
        {services?.map((item) => { 
            console.log("itemisconfirmed", item.isConfirmed)
            console.log("item", item)
            return (
            <>
            {!item.isConfirmed && 
                (<section key={item.id} >
                <Div> Address: {item.address}</Div>
                <Div> Title: {item.title}</Div>
                {/* <Div> Description: {item.description}</Div> */}
                <Button type="confirm" value="confirm"
                    onClick={()=> {navigateService(`/services/${item._id}`)
                    setService(item)}
                }
                >
                Send an offer
                </Button>
                </section>)}
            </>
            )
        })}  
        </ServicesSection>
        {/* <MapSection> */}
        <Map markerArr={markerArr} />
        {/* </MapSection> */}
        </section>)}
        </Wrapper>
        </>
    )
};       

export default DisplayServices;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
`;

const ServicesSection = styled.section`
padding-top: 50px;
padding-left: 20px;
display: inline-block;
width: 800px;
`;

const Div = styled.div`
display: inline-block;
padding: 10px;
height: 50px;
width: 300px;
border: 2px solid gray;
margin-bottom: 20px;
`;

const Button = styled.button`
font-family: Arial, sans-serif;
padding: 10px;
margin-left: 10px;
background: #004B99 0% 0% no-repeat padding-box;
color: #fff;
border-radius: 5px;
font-size: 1.3rem;
font-weight: 400;
border: 0px;
box-shadow: 0px 3px 10px darkblue;
letter-spacing: 0.1rem;

&:hover {
background-color: lightblue;
color: black;
}
`;