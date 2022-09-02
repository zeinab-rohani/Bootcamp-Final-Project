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
    services, setServices, setServiceProvider, serviceProviders,
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
        console.log("providers", serviceProviders)

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
                lat: item.addressPositionLat,
                lng: item.addressPositionLng,
                text: "client"
            }
        ])
        setService((service) => [...service, {item}])
        setServices(data.data)
        setLoading(false);
        }))
        }
        };
console.log("markerArr", markerArr)  
console.log("service", service)
console.log("service Id", service._id)


        const confirmHandle = () => {
            navigateService(`/services/${service._id}`) }
        
        return(
        <>
        <Wrapper>    
        <button onClick={getAllServices}>Click here to see all service requests</button>
        {loading ? (
        <Loading />
        ) : (
        <section>
        <ServicesSection> 
        {services?.map((item, index) => { 
            setService(item);
            return (
                <>
                    <section>
                    <Div> Category: {service.address}</Div>
                    <Div> Title: {service.title}</Div>
                    <Div> Description: {service.description}</Div>
                    <button type="confirm" value="confirm"
                        onClick={confirmHandle}
                    >
                    Send a suggestion
                    </button>
                    </section>
                </>
            )
        })}  
        </ServicesSection>
        <Map markerArr={markerArr} serviceId={service._id} />
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