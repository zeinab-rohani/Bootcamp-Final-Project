import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import Map from "./Map";
import { Loading } from "./Loading";

const Services = () => {
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
        if (emailCheck.lenght>=2) {
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

        }))

        setLoading(false);
        } else {
            console.log("not allowed")
        }
        };

        
console.log("markerArr", markerArr)  
console.log("service", service)  

        return(
        <>
        <button onClick={getAllServices}>Click here</button>
        <section>
        {services.map((item) => { 
            return (
                <>  
                <div>{item.address}</div>
                <div>{item.description}</div>
                </>)
        })}  
        </section>
        {loading ? (
        <Loading />
        ) : (
        <Map markerArr={markerArr} />)}
        </>
    )
        }

export default Services;
