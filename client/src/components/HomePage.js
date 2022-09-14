import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";

const HomePage = () => {
    const {setServiceProvider, serviceProviders, serviceProvider,
        setServiceProviders, setUser} = useContext(CurrentRequestContext);
    const { user } = useAuth0();
    setUser(user);
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

    // devide users to redirect them to the proper page.
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
    }

    return (
        <Wrapper>
            <Container>
                <Image src={process.env.PUBLIC_URL + "/tools.webp"} />
                <Section>
                    {!user &&
                    <>
                        <Div>
                            <p style={{marginBottom: "20px"}}>
                            Need help with something in your house? </p>
                            <p style={{fontStyle: "italic"}}>Sign in to find it!</p>          
                        </Div>
                        <ServicesDiv>
                            <p style={{marginBottom: "20px"}}>Our services:</p>
                            <div style={{marginBottom: "10px"}}>
                                <ServiceImage src={process.env.PUBLIC_URL + "/plumbing.png"}/>
                                <span style={{marginLeft: "20px"}} >Plumbing</span>
                            </div>
                            <div>
                                <ServiceImage src={process.env.PUBLIC_URL + "/painting.png"}/>
                                <span style={{marginLeft: "20px"}} >Painting</span>
                            </div>
                            <div>
                                <ServiceImage src={process.env.PUBLIC_URL + "/appliances.png"}/>
                                <span style={{marginLeft: "20px"}} >Appliances</span>
                            </div>
                            <div>
                                <ServiceImage src={process.env.PUBLIC_URL + "/floor.png"}/>
                                <span style={{marginLeft: "20px"}} >Flooring/Tiles</span>
                            </div>
                        </ServicesDiv>
                    </>}            
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
top: 10%;
left: 32%;
color: white;
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


export default HomePage;