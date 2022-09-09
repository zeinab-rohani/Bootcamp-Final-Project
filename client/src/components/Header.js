import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png"

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    // {user ? console.log("user", user.name) : console.log("no user found")}
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
                {/* {!isAuthenticated && <LoginButton />} */}
                {isAuthenticated && <LogoutButton />}
                {/* {isAuthenticated && <Link to="/profile"></Link>} */}
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
z-index: 200;
    transition: all 5ms;

    &:hover {
        /* background-color: rgba(0, 0, 0, 0.3); */
        background-color: #87CEFA;
    }

    & > a {
        color: black;
    }
    `;

const Logo = styled.div`
display: inline-block;
padding : 10px;
height: 100px;
`;
const SigninSection = styled.div`
display: inline-block;
font-size: large;
color: #004B99;
margin-left: 300px;
`;

const WelcomeDiv = styled.div`
display: inline-block;
font-size: 25px;
margin-left: 300px;
font-style: italic;
padding: 10px;
color: #004B99
`;