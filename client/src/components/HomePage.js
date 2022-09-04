import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";

const HomePage = () => {
    const {setServiceProvider, serviceProviders,
        setServiceProviders, client,
        serviceProvider}
        = useContext(CurrentRequestContext);
    const { user } = useAuth0();
    const navigateProfile = useNavigate();
    const navigateServices = useNavigate();

    useEffect(() => {
        const getServiceProviders = async () => {
            const res = await fetch("/api/companies");
            const { data } = await res.json();
            setServiceProviders(data);
            };
        
            getServiceProviders();
    }, [])

    const getUserType = () =>{
        let emailCheck = [{}];
        serviceProviders.map((item) => {
            if (item.email === user.email){
                (emailCheck = [...emailCheck,{item}])
                setServiceProvider(item.email)
            }
        })
        if (emailCheck.length>1){
        navigateServices("./services")
        } else {
        navigateProfile("./Profile")
        }
        console.log("email check", emailCheck)
    }

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
                <div>You are logged in, click to continue</div>
                <Button
                onClick={getUserType}
            >
            </Button>
                </> }
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