import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";

const HomePage = () => {
    const {setCurrentUser} = useContext(CurrentRequestContext);
    const { user } = useAuth0();
    setCurrentUser(user);

    const navigateProfile = useNavigate();
    const navigateServices = useNavigate();

    const handleClick = () => {
        navigateServices("/services")}

    const newServicHandleClick = () => {
        navigateProfile("./Profile")}

    return (
        <Wrapper>
            <Container>
                <Image src={process.env.PUBLIC_URL + "/image.png"} />
                <Section>
                {!user &&
                    <>
                    <Div>Need help with something in your house?           
                    Sign in to find it:</Div>
                    </>            
                    }
                    {user && 
                    <>
                    <Label>Click here to send a request for the service you need:
                    </Label>
                    <Button onClick={() => newServicHandleClick()}>
                    Click here
                    </Button>
                    <SpSection>
                        <SpButton onClick={() => {handleClick();}}>
                            Are yuo a service provider? Click here
                        </SpButton>
                    </SpSection>
                    </>
                }
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
height: 110px;
padding: 5px;
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
height : 50px;
font-size : x-large;
padding: 20px;
`;

const Button = styled.button`
border: 3px solid black;
height: 30px;
width: 80px;
color: white;
background-color: blue;
`;

const Label = styled.label`
font-size: x-large`;

const SpSection = styled.div`
font-size: large;
`;

const SpButton = styled.button`
height: 50px`;

export default HomePage;