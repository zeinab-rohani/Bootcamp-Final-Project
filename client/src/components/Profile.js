import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useAuth0();
  const navigateNewService = useNavigate();
  const navigateUserServices = useNavigate();

  const newServiceHandler = () => {
      navigateNewService("/serviceForm")
  }
  const manageServicesHandler = () => {
    navigateUserServices("/user-services")
  }
  return (
    isAuthenticated && (
      <Wrapper>
        <p style={{fontSize:"40px", color: "#004B99", marginLeft: "50px", 
          fontWeight: "bold", paddingTop: "50px"}}> Please click to continue:
        </p>
        <Button onClick={newServiceHandler} >
        Add a new service request</Button>
        <Button onClick={manageServicesHandler} >
        Manage my previous service requests</Button>
      </Wrapper> 
    )
  );
};

export default Profile;

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
