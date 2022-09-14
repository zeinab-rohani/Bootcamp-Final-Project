import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ServiceProviderPage = () => {
    const navigateServices = useNavigate();
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

