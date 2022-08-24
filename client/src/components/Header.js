import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
// import CurrentBookingProvider from "./CurrentBookingContext";

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    // const { currentServiceProvider, setCurrentServiceProvider } =
    // useContext(CurrentBookingProvider)

{user ? console.log("user", user.name) : console.log("no user found")}
    return (
        <Wrapper>
            <Link to="/" >
            <Logo>
                <h1>My logo</h1>
                {user && 
                <Div>Welcome {user.name}</Div>
    
                }
                  
                
                <SigninSection>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
                {isAuthenticated && <Link to="/profile"></Link>}
                </SigninSection>
            </Logo>
            </Link>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
display: flex;
justify-content: space-between;
background-color: #2e8b57;
height: 90px;
padding: px;
`;

const Logo = styled.div`
padding : 30px;
height: 80px;
width: 100%;
`;

const SigninSection = styled.div`
margin-left : 1000px;
`;

const Div = styled.div`
font-size: large;
`;
