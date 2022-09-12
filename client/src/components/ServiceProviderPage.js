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

            <Wrapper>
            <p style={{fontSize:"40px", color: "#004B99", marginLeft: "50px", 
                fontWeight: "bold", paddingTop: "50px"}}> Please click to continue: </p>    
            <Button onClick={servicesHandler} > See all the service requests </Button>
            <Button onClick={manageOffersHandler} >Manage my previous offers</Button>
            </Wrapper> 
        );
    };

export default ServiceProviderPage;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
`;

const Button = styled.button`
font-size: x-large;
font-weight: bold;
margin: 50px;
height: 80px;
width: 400px;
border: 5px solid #004B99;
background-color: #B0E0E6;
`;

// const Button= styled.button`
// margin: 50px;
// padding: 30px;
// font-size: 30px;
// font-weight: bold;
// padding: 10px;
// `;
