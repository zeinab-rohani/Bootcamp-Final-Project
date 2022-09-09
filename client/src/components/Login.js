import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import styled from "styled-components";

const LoginButton = () => {
    const { isAuth, setAuth } = useState(false)
    const { loginWithRedirect } = useAuth0();

    return(
        <> 
            <Button onClick={() => loginWithRedirect()}>Sign in to find it</Button>
        </>
    )
}

export default LoginButton;

const Button= styled.button`
border: 5px solid #004B99;
font-size: 35px;
font-weight: bold;
padding: 10px;
background-color: #B0E0E6;
`;