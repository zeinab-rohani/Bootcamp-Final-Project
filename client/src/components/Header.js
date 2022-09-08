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
            <Div style={{color:"#004B99"}}><img src={logo} /><h1>Home Aide</h1></Div>
            {user && 
            <Div style={{marginLeft:"200px"}}>Welcome {user.name}</Div>
            }
            <SigninSection>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
                {/* {isAuthenticated && <Link to="/profile"></Link>} */}
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
background-color: rgba(0, 0, 0, 0.3);

height: 105px;
padding: 0;
z-index: 200;
    transition: all 5ms;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    & > a {
        color: black;
    }
    `;

const Logo = styled.div`
margin-left: 80px;
padding : 2px;
height: 100px;
width: 100%;
`;
const SigninSection = styled.div`
display: inline-block;
margin-left : 600px;
font-size: large;
`;

const Div = styled.div`
display: inline-block;
font-size: large;
`;

