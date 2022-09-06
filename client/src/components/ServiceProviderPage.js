import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";


const ServiceProviderPage = () => {
    const {user, serviceProvider}
        = useContext(CurrentRequestContext);
        const navigateServices = useNavigate();
        console.log("service provider ", serviceProvider)


    const navigateOffers = useNavigate();


    const servicesHandler = () => {
        navigateServices("./services")
    }
    const manageOffersHandler = () => {
        navigateOffers("./offers")
    }
        return (

            <div>
            <Button onClick={servicesHandler} > See all the service requests </Button>
            <Button onClick={manageOffersHandler} >Manage my previous offers</Button>
            </div> 
        );
    };

export default ServiceProviderPage;

const Button = styled.button`
font-size: x-large;
margin: 50px;
height: 80px;
width: 400px;
border: 3px solid gray;
background-color: lightblue;
`;
