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
    const {currentUser, service, setService,
    services, setServices,serviceProvider, setServiceProvider, serviceProviders,
    setServiceProviders } = useContext(CurrentRequestContext);

    const navigateService = useNavigate()

    useEffect(() => {
        const getServiceProviders = async () => {
            setLoading(true);
            const res = await fetch("/api/companies");
            const { data } = await res.json();
            setServiceProviders(data);
            setLoading(false);
            };
                getServiceProviders();
                
        }, []);

    const getAllServices = () => {
        let emailCheck = [{}];
        serviceProviders.map((item) => {
            if (item.email === currentUser.email){
                (emailCheck = [...emailCheck,{item}])
            }
        })
        if (emailCheck.length<=1)
            {console.log("not allowed")
        } else {
        setLoading(true);
        setServiceProvider(currentUser)
        fetch("/api/services")
        .then((response) => response.json())
        .then((data) => data.data.map((item) => {
        setMarkerArr((markerArr)=>[
            ...markerArr,
            {
                item: item,
                id : item._id,
                lat: item.addressPositionLat,
                lng: item.addressPositionLng,
                text: "client"
            }
        ])
        setServices(data.data)
        setLoading(false);
        }))
        }
        };
    
        return(
        <>
        <Wrapper>    
        <button onClick={getAllServices}>Click here to see all service requests</button>
        {loading ? (
        <Loading />
        ) : (
        <section>
        <ServicesSection> 
        {services?.map((item) => { 
            return (
            <>
                <section key={item.id} >
                <Div> Address: {item.address}</Div>
                <Div> Title: {item.title}</Div>
                <Div> Description: {item.description}</Div>
                <button type="confirm" value="confirm"
                    onClick={()=> {navigateService(`/services/${item._id}`)
                    setService(item)}
                }
                >
                Send an offer
                </button>
                </section>
            </>
            )
        })}  
        </ServicesSection>
        <Map markerArr={markerArr} />
        </section>)}
        </Wrapper>
        </>
    )
        }

export default DisplayServices;

const Wrapper = styled.section`
`;

const ServicesSection = styled.section`
display: inline-block;
`;

const ServiceInfo = styled.div`
`;

const Div = styled.div`
display: inline-block;
padding: 5px;
height: 30px;
width: 100px;
border: 3px solid gray;
`;