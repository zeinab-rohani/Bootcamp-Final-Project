import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import LoginButton from "./Login";

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
                <Image src={process.env.PUBLIC_URL + "/tools.webp"} />
                <Section>
                {!user &&
                    <>
                    <div style={{paddingLeft: "600px", marginTop: "20px",
                marginBottom: "80px"}}>
                    <LoginButton />
                    </div>
                    <Div><p style={{fontSize:"50px", paddingLeft: "100px",
                fontWeight: "bold"}}>Need help with something in your house? Sign in to find it!</p>          
                    
                </Div>
                
                    </>            
                } 
                {user &&
                <>
                <div style={{fontSize:"50px", paddingLeft: "100px", paddingTop: "80px",
                fontWeight: "bold"}}>You are logged in, </div>
                <div style={{paddingLeft: "100px", marginTop: "20px"}}>
                <Button onClick={getUserType} >click to continue</Button>
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
width: 50%;
height: 200px;
padding: 5px;
/* background-color: #B0E0E6; */
top: 10%;
left: 35%;
color: black;
/* color: #004B99; */
/* border: 5px solid #87CEFA; */
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
align-items: center;
`;

const Button= styled.button`
border: 5px solid #004B99;
font-size: 35px;
font-weight: bold;
padding: 10px;
background-color: #B0E0E6;
`;

const Label = styled.label`
font-size: x-large`;

const SpSection = styled.div`
font-size: large;
`;

const SpButton = styled.button`
height: 50px`;

export default HomePage;