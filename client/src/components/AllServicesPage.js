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

    useEffect(() => {
        setLoading(true);

        // get all service providers from database.
        const getServiceProviders = async () => {
            const res = await fetch("/api/companies");
            const { data } = await res.json();
            setServiceProviders(data);
        };
        getServiceProviders();

        // get all availables services.
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
            }))
        setLoading(false);
    }, []);

    return(
        <Wrapper>    
            {loading ? (
            <Loading />
            ) : (
            <section>
                <ServicesSection> 
                    {services?.map((item) => { 
                    return (
                        <>
                        {!item.isConfirmed && 
                        (<section key={item.id} >
                            <AdressDiv> Address: {item.userAddress}</AdressDiv>
                            <TitleDiv> Title: {item.title}</TitleDiv>
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
                <Map markerArr={markerArr} />
            </section>)}
        </Wrapper>
    )
};       

export default DisplayServices;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
`;

const ServicesSection = styled.section`
padding-top: 30px;
padding-left: 20px;
display: inline-block;
width: 800px;
`;

const AdressDiv = styled.div`
display: inline-block;
padding: 10px;
height: 60px;
width: 400px;
border-bottom: 2px solid gray;
margin-bottom: 20px;
`;

const TitleDiv = styled.div`
display: inline-block;
padding: 10px;
height: 60px;
width: 150px;
border-bottom: 2px solid gray;
margin-bottom: 20px;
`;

const Button = styled.button`
font-family: Arial, sans-serif;
padding: 10px;
margin-left: 10px;
background: #004B99 0% 0% no-repeat padding-box;
color: #fff;
border-radius: 5px;
font-size: large;
font-weight: 400;
border: 0px;
box-shadow: 0px 3px 10px darkblue;
letter-spacing: 0.1rem;

&:hover {
background-color: lightblue;
color: black;
}
`;