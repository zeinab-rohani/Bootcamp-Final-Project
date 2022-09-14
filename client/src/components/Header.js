import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png"

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();

    return (
        <Wrapper>
            <Link to="/" >
            <Logo>  
                <div style={{display:"inline-block",}}><img src={logo} /></div>
                <h1 style={{marginLeft:"5px", display:"inline-block",
                color:"#004B99", fontFamily: "Brush Script MT, cursive",
                fontSize: "xx-large"}}>Home Aide</h1>
            </Logo>
            {user && 
            <WelcomeDiv>Welcome {user.name}</WelcomeDiv>
            } 
            <SigninSection>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
            </SigninSection>
            </Link>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
background-color: #B0E0E6;
height: 120px;
width: 100%;
padding-left: 100px;
padding-top: 10px;
`;

const Logo = styled.div`
display: inline-block;
padding : 10px;
height: 100px;
`;

const SigninSection = styled.div`
display: inline-block;
font-size: medium;
color: #004B99;
@media screen and (min-width: 1100px) {
margin-left: 100px;
} 
@media screen and (min-width: 1300px) {
margin-left: 400px; 
}
`;

const WelcomeDiv = styled.div`
display: inline-block;
font-size: 25px;
margin-left: 100px;
font-style: italic;
padding: 10px;
color: #004B99
`;