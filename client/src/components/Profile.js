import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
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
        <div>
          my profile
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <LogoutButton />
          <Button onClick={newServiceHandler} >Add a new service request</Button>
          <Button onClick={manageServicesHandler} >Manage my previous service requests</Button>
        </div> 
      )
    );
};

export default Profile;

const Button = styled.button`
margin: 50px;
height: 50px;
width: 200px;
border: 3px solid gray;
`;
