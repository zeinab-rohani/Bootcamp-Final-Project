import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate, NavLink } from "react-router-dom";
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
    services, setServices, serviceProviders,
    setServiceProviders} = useContext(CurrentRequestContext)

    const navigateServiceDetaile = useNavigate()

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
                (
                    emailCheck = [...emailCheck,{item}]
                )
            }
        })
        console.log("e-ch",emailCheck)
        console.log("e-ch. leng",emailCheck.length)

        if (emailCheck.length<=1)
            {console.log("not allowed")
        } else {
        setLoading(true);
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

        return(
        <>
        <Wrapper>    
        <button onClick={getAllServices}>Click here to see all service requests</button>
        {loading ? (
        <Loading />
        ) : (
        <ServicesSection> 
        {services?.map((item, index) => { 
            console.log("item", item)
            setService(item);
            return (
                <ServiceInfo key={index}>
                    <div
                    onClick={() => {
                        navigateServiceDetaile(`/services/${service._id}`)
                    }}
                    >{service.userAddress}</div>
                    <div>{service.category}</div>
                    <div>{service.description}</div>
                </ServiceInfo>)
        })}  
        <Map markerArr={markerArr} />
        </ServicesSection>)}
        </Wrapper>
        </>
    )
        }

export default DisplayServices;

const Wrapper = styled.section`
`;

const ServicesSection = styled.section`
`;

const ServiceInfo = styled.div`
`;
