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
                    <Div><p style={{marginBottom: "20px"}}>
                        Need help with something in your house? </p>
                        <p style={{fontStyle: "italic"}}>Sign in to find it!</p>          
                    </Div>
                    <ServicesDiv>
                        <p style={{marginBottom: "20px"}}>Our services:</p>
                        <div style={{marginBottom: "10px"}}>
                        <ServiceImage src={process.env.PUBLIC_URL + "/plumbing.png"}/>
                        <span style={{marginLeft: "10px"}} >Plumbing
                        <span style={{marginLeft: "10px", fontSize: "large"}}>
                        {/* Clogged drain, leaky pipe, kitchen or bathroom */}
                        </span></span>
                        </div>
                        <div>
                        <ServiceImage src={process.env.PUBLIC_URL + "/painting.png"}/>
                        <span style={{marginLeft: "10px"}} >Painting
                        <span style={{marginLeft: "10px", fontSize: "large"}}>
                        {/* Transform your home or office with professional painting */}
                        </span></span>
                        </div>
                        <div>
                        <ServiceImage src={process.env.PUBLIC_URL + "/appliances.png"}/>
                        <span style={{marginLeft: "10px"}} > Appliances
                        <span style={{marginLeft: "10px", fontSize: "large"}}>
                        {/* Installation and Repair washer-dryer, stove */}
                        </span></span>
                        <div></div>
                        <ServiceImage src={process.env.PUBLIC_URL + "/floor.png"}/>
                        <span style={{marginLeft: "10px"}} >Flooring/Tiles
                        <span style={{marginLeft: "10px", fontSize: "large"}}>
                        {/* Installation of hardwood, laminate, tiles, back splash */}
                        </span></span>
                        </div>
                    </ServicesDiv>
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
background-color: #FFEBCD;
height : 1500px;
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
width: 70%;
height: 700px;
padding: 5px;
/* background-color: #B0E0E6; */
top: 10%;
left: 32%;
color: white;
/* color: #004B99; */
/* border: 5px solid #87CEFA; */
`;

const Image = styled.img`
object-fit: cover;
width: 100%;
height: 800px;
opacity : 0.9;
`;

const ServiceImage = styled.img`
background-color: #004B99;
width: 60px;
height: 60px;
`;

const Div = styled.div`
padding-left: 100px;
font-size: 50px;
font-weight: bold;
`;

const ServicesDiv = styled.div`
margin-top: 100px;
padding-left: 100px;
font-size : xx-large;
font-weight: bold;
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