import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { lightGreen } from "@mui/material/colors";

const Offers = () => {
    const [loading, setLoading] = useState(false);

    const {user, serviceProvider, setServiceProvider} = useContext(CurrentRequestContext)
    const navigateMyService = useNavigate()

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const getOffers = async () => {
            const res = await fetch("/api/offers");
            const { data } = await res.json();
            setOffers(data);
            };
            getOffers();
                
        }, []);

return(
    <Wrapper>
    {loading ? (
        <Loading />
        ) : (<section>
    {offers?.map((item)=>{
        console.log("item sp", item.serviceProvider)  
        console.log("serviceProvider", serviceProvider)
        console.log("user", user)  

        setServiceProvider(user.name)
                return(
                    <>
                    {item.serviceProvider==serviceProvider ? (
                    <Section>
                    {/* <section onClick={() => navigateMyService(`/services/${item._id}`)}> */}
                    <Div> service Title: {item.title}</Div>
                    <Div> Description: {item.description}</Div>
                    <Div> clientEmail: {item.clientEmail}</Div>
                    <Div> address: {item.address}</Div>
                    <Div> offer: {item.offer}</Div>
                    {item.isConfirmed == true &&
                    <ConfirmDiv> Offer is confirmed </ConfirmDiv>}
                    </Section>)
                    : <>test</>}
                    {/* </section> */}
                    </>)
                })}
                
            </section>
        )}    
    </Wrapper>
    )
}

export default Offers;

const Div = styled.div`
display: inline-block;
padding: 10px;
height: 80px;
width: 500px;
border: 3px solid gray;
`;

const ConfirmDiv = styled(Div)`
background-color: green;
color: white;
`

const Section = styled.section`
padding: 30px;
`;

const Wrapper = styled.div`
background-color: #FFEBCD;
height: 1000px;
`;