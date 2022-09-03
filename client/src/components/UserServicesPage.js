import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";

const UserServicesPage = () => {
    const { currentUser, client, setClient, setService } = useContext(CurrentRequestContext);
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
        <div>
            {allServices.map((item) => {
                if(item.userEmail===currentUser.email){
                    setClient(currentUser)
                    setService(item)
                    return(
                    <Section>
                    <Div onClick={() => navigateMyService(`/services/${item._id}`)}>
                        Id: {item._id}
                    </Div>
                    <Div> Category: {item.category}</Div>
                    <Div> Title: {item.title}</Div>
                    <Div> Description: {item.description}</Div>
                    <Div> Status: {item.status}</Div>
                    </Section>
                )}
            })}
        </div>
        </>
    )
}

export default UserServicesPage;

const Section = styled.div`
width: 100%;
height: 120px;
padding: 10px;
`;

const Div = styled.div`
display: inline-block;
padding: 5px;
height: 50px;
width: 250px;
border: 3px solid gray;
`;