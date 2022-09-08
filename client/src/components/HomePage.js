import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import Keyframes from '@keyframes/core';
import { padding } from "@mui/system";

const HomePage = () => {
    const {setServiceProvider, serviceProviders, serviceProvider,
        setServiceProviders, setUser}
        = useContext(CurrentRequestContext);
    const { user } = useAuth0();
    setUser(user);
    console.log("user", user)
    const navigateProfile = useNavigate();
    const navigateServiceProvider = useNavigate();

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
        navigateServiceProvider("./service-provider")
        } else {
        navigateProfile("./Profile")
        }
        console.log("email check", emailCheck)
    }
console.log("service provider ", serviceProvider)
    return (
        <Wrapper>
            <Container>
                <Image src={process.env.PUBLIC_URL + "/Homeowners.jpg"} />
                <Section>
                {!user &&
                    <>
                    <Div>Need help with something in your house?           
                    Sign in to find it:</Div>
                    </>            
                } 
                {user &&
                <>
                <div style={{fontSize:"x-large", paddingLeft: "40px"}}>You are logged in, click to continue</div>
                <div style={{paddingLeft: "200px"}}>
                <Button
                onClick={getUserType}
            >
            </Button>
            </div>
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
width: 35%;
height: 80px;
padding: 5px;
background-color: rgba(0, 0, 0, 0.4);
top: 15%;
left: 33%;
color: white;
border: 5px solid #FF0000;
`;

const Image = styled.img`
object-fit: cover;
width: 100%;
height: 800px;
/* opacity : 0.7; */
`;

const Div = styled.div`
height : 50px;
font-size : x-large;
align-items: center;
`;

const Button = styled.button`
border: 3px solid black;
height: 30px;
width: 80px;
color: white;
padding-left: 100px;
background-color: lightblue;
`;

const Label = styled.label`
font-size: x-large`;

const SpSection = styled.div`
font-size: large;
`;

const SpButton = styled.button`
height: 50px`;

export default HomePage;