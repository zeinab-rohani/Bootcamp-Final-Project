import styled from "styled-components";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();

    const navigateNewService = useNavigate();
    const navigateServices = useNavigate();


const newServicHandleClick = () => {
    navigateNewService("/serviceForm")
}

const manageHandleClick = () => {
    navigateServices("/services")
}

    return (
        <Wrapper>
            <Container>
                <Image src={process.env.PUBLIC_URL + "/image.png"} />
                <Section>
                {!user &&
                <>
                <p>Need help with something in your house?</p>            
                <p>Sign in to find it:</p>
                </>            
                }

                {user && 
                <>
                <Div>Welcome {user.name}</Div>
                <>
                <button onClick={() => newServicHandleClick()}>
                    Request a new service
                </button>
                <button onClick={() => manageHandleClick()} >
                    Manage my previous services
                </button>
                </>
                {/* <Link to="/profile">Visite my profile</Link> */}
                </>
                }
                {/* <SigninSection>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
                {isAuthenticated && 
                <div>Manage my requests:
                    <Link to="/profile"></Link>
                </div>
                }
                </SigninSection> */}
                </Section>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
height : 1000px;
width : 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const Container = styled.div`
width: 100vw;
position: relative;
`;

const Section = styled.div`
position: absolute;
width: 60%;
height: 100px;
background-color: white;
top: 15%;
left: 20%;
color: #2F4F4F;
border: 10px solid #2e8b57;
`;

const Image = styled.img`
object-fit: cover;
width: 100%;
height: 800px;
opacity : 0.7;
`;

const Div = styled.div`
height : 20px;
font-size : large;
`;

const Button = styled.button`
border: 3px solid black;
height: 30px;
color: white;
background-color: blue;
`;

const SigninSection = styled.div`
margin-left : 300px;
`;


export default HomePage;