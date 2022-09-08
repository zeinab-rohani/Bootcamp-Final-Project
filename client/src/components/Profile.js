import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
        <div style={{backgroundColor: "#C0C0C0"}}>
        <InfoSection>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </InfoSection>
          <Button onClick={newServiceHandler} >Add a new service request</Button>
          <Button onClick={manageServicesHandler} >Manage my previous service requests</Button>
        </div> 
      )
    );
};

export default Profile;

const InfoSection = styled.div`
margin: 50px;
font-size: large;
`;

const Button = styled.button`
font-size: x-large;
margin: 50px;
height: 80px;
width: 400px;
border: 3px solid gray;
background-color: lightblue;
`;
