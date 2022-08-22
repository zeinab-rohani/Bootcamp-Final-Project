import styled from "styled-components";
import {Link} from "react-router-dom";
import LogoutButton from "./Logout";

const HomePage = () => {
    return (
        <Wrapper>
            <Container>
                <Image src={process.env.PUBLIC_URL + "/image.png"} />
                <FirstSection>
                    <Div>Provide your address and choose a service</Div>            
                </FirstSection>
                <SecondSection>
                    <Input type={"text"} value={"address"} placeHolder={"Enter your address"}></Input>
                    
                </SecondSection>
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

const FirstSection = styled.div`
position: absolute;
font-size: 3rem;
font-weight: bolder;
top: 8%;
left: 20%;
color: #2F4F4F;
`;

const SecondSection = styled.div`
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
height : 500px;
font-size : xx-large;
`;

const Input = styled.input`
`;
export default HomePage;