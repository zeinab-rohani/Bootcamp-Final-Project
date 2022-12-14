import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";

const UserServicesPage = () => {
    const { user, setService } = useContext(CurrentRequestContext);
    const navigateMyService = useNavigate()
    const[allServices, setAllServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
        const res = await fetch("/api/services");
        const { data } = await res.json();
        setAllServices(data);
        };
        fetchServices();
    }, []);

    return (
        <>
        <Wrapper>
            <P> You can click on the Id to see detailes of the service:</P>
            {allServices.map((item) => {
                if(item.userEmail===user.email){
                return(
                <>
                <Section>
                    <Div onClick={() => {navigateMyService(`/services/${item._id}`)
                    setService(item)}}>
                    Id: {item._id}</Div>
                    <Div> Title: {item.title}</Div>
                </Section>
                </> 
                )}
            })}
        </Wrapper>
        </>
    )
}

export default UserServicesPage;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1500px;
padding : 20px;
`;

const P = styled.p`
padding: 50px;
font-size : 30px;
`;

const Section = styled.div`
width: 100%;
height: 120px;
padding: 50px;
`;

const Div = styled.div`
font-size: large;
display: inline-block;
padding: 10px;
height: 50px;
width: 350px;
border: 3px solid #004B99;
`;