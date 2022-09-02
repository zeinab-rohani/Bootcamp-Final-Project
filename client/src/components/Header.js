import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    // {user ? console.log("user", user.name) : console.log("no user found")}
    return (
        <Wrapper>
            <Link to="/" >
            <Logo>
            <H1>Home Aide</H1>
            {user && 
            <Div>Welcome {user.name}</Div>
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
background-color: #2e8b57;
height: 90px;
padding: 5px;
`;

const Logo = styled.div`
margin-left: 80px;
padding : 10px;
height: 40px;
width: 100%;
`;

const H1= styled.h1`
padding-bottom: 15px;
font-size: large
`;

const SigninSection = styled.div`
margin-left : 1100px;
font-size: large;
`;

const Div = styled.div`
font-size: large;
`;

