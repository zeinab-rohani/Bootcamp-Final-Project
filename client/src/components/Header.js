import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentBookingContext from "./CurrentBookingContext";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";


const Header = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const { user } = useAuth0();

{user ? console.log("user", user.name) : console.log("no user found")}

    useEffect(()  =>{
        const getProtectedMessage = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently()
                fetch("/fetch-message",
                {
                    headers: {
                        Authorization: "Bearer" + accessToken
                    }
                }
                ).then(res => {
                    if (res.status === 200){
                        return res.json().then(data => setMessage(data.message))
                    } else {
                        setError(res.statusText)
                    }
                    
                })
            }
        }
        getProtectedMessage()
    },[isAuthenticated, getAccessTokenSilently])

    return (
        <Wrapper>
            <Link to="/" >
            <Logo>
                <h1>My logo</h1>
                {user && <Div>Hi {user.name}</Div>}
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
