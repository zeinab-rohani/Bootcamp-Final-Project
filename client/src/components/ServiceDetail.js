import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";


const ServiceDetail = () => {
    const {user, serviceProvider, service} = useContext(CurrentRequestContext)
    const [myoffer, setMyOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    console.log("service provider ", serviceProvider)

    useEffect(() => {
        const getOffers = async () => {
            const res = await fetch("/api/offers");
            const { data } = await res.json();
            setOffers(data);
            };
            getOffers();
                
        }, []);
        console.log("offers", offers)
    
    const handleConfirm = () =>{
        setIsConfirmed(true)   
        fetch("/api/update-service", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            // })
            }).then((res) => {
                return res.json();
        }); 
    };

    const offerHandle =() => {
        fetch("/api/add-offer", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                serviceId: service._id,
                clientEmail: service.email,
                serviceProvider: serviceProvider.name,
                Address: service.address,
                title: service.title,
                description: service.description,
                serviceCategory: service.serviceCategory,
                serviceProvider: serviceProvider,
                offer: myoffer
            }),
            }).then((res) => {
            return res.json();
            });
            }


    return (
        <>
        {/* // <>{!serviceProvider && */}
        <ClientSection>
            <Div> Category: {service.category}</Div>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            {offers?.map((item)=>{
                if(item.serviceId===service._id){
                return(
                    <section>
                    <Div>Offer: {item.offer}</Div>
                    <Div>Companie: {item.serviceProvider.name}</Div>
                    <button type="confirm" value="confirm"
            onClick={handleConfirm}
            >
            confirm the offer
            </button>
            {isConfirmed &&
            <div> The offer is confirmed</div>}
                    </section>
                )}
            })}
        {/* {serviceProvider && */}
        <ServiceProviderSection>
            <Div> Category: {service.category}</Div>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            <Label> Your Offer for the service:
            <UserInput type="text" placeholder="  offer" 
                onChange={(event) => 
                    setMyOffer(event.target.value)} />
            </Label>
            <button type="confirm" value="confirm"
                        onClick={offerHandle}
            >
            Submit the offer
            </button>
        </ServiceProviderSection>
        </ClientSection>

        </>

    )
}

export default ServiceDetail;

const Div = styled.div`
display: inline-block;
padding: 5px;
height: 50px;
width: 250px;
border: 3px solid gray;
`;

const ClientSection = styled.section``;

const ServiceProviderSection = styled.section``;

const Label = styled.label`
color: black;
font-size : large;
height: 50px;
width : 70px;
`;

const UserInput = styled.input`
height: 40px;
width : 350px;
border: 2px solid lightgray;
margin-left: 10px;
margin-right: 50px;
margin-top: 15px;
margin-bottom: 15px;
`;