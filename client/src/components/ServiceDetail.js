import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";


const ServiceDetail = () => {
    const {user, serviceProvider, service} = useContext(CurrentRequestContext)
    const [myoffer, setMyOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    console.log("service provider ", serviceProvider)
    console.log("service ", service)

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
        fetch("/api/update-service", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                serviceId: service._id,
            }),
            }).then((res) => {
            return res.json();
            });
    };
    console.log("service id",service._id)
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
                address: service.address,
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
        <Wrapper>
        <P> To confirm the offer, click on the confirm button:</P>

        {!serviceProvider &&
        <ClientSection>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            {offers?.map((item)=>{
                if(item.serviceId===service._id){
                return(
                    <OfferSection>
                    <p style={{fontSize:"x-large", marginBottom: "10px"}}> Offers for your service:</p>
                    <Div>Offer: {item.offer}</Div>
                    <Div>Companie: {item.serviceProvider.name}</Div>
                    <Button type="confirm" value="confirm"
            onClick={handleConfirm}
            >
            confirm
            </Button>
            {isConfirmed &&
            <div> The offer is confirmed</div>}
                    </OfferSection>
                )}
            })}
        </ClientSection> }   
        {serviceProvider &&
        <ServiceProviderSection>
            <Div> Category: {service.category}</Div>
            <Div> Title: {service.title}</Div>
            <Div> Description: {service.description}</Div>
            <Label> Your Offer for the service:
            <UserInput type="text" placeholder="  offer" 
                onChange={(event) => 
                    setMyOffer(event.target.value)} />
            </Label>
            <Button type="confirm" value="confirm"
                        onClick={offerHandle}
            >
            Confirm
            </Button>
        </ServiceProviderSection>}
    

        </Wrapper>

    )
}

export default ServiceDetail;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
padding : 20px;
`;

const Div = styled.div`
font-size: large;
display: inline-block;
padding: 5px;
height: 50px;
width: 500px;
border: 3px solid #004B99;
`;

const P = styled.p`
padding: 50px;
font-size : 30px;
`;

const ClientSection = styled.section`
padding-left: 50px;
`;

const OfferSection = styled.section`
padding-top: 50px;
`;

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

const Button = styled.button`
font-family: Arial, sans-serif;
padding: 10px;
margin-left: 10px;
background: #004B99 0% 0% no-repeat padding-box;
color: #fff;
border-radius: 5px;
font-size: 1.3rem;
font-weight: 400;
border: 0px;
box-shadow: 0px 3px 10px darkblue;
letter-spacing: 0.1rem;

&:hover {
background-color: lightblue;
color: black;
}
`;