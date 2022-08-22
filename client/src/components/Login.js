import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const LoginButton = () => {
    const { isAuth, setAuth } = useState(false)
    const { loginWithRedirect } = useAuth0();

    return(
        <> 
            <button onClick={() => loginWithRedirect()}>Log In</button>;
        </>
    )
}

export default LoginButton;