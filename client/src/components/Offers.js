import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { Loading } from "./Loading";

const Offers = () => {
    const {user, serviceProvider, setServiceProvider} = useContext(CurrentRequestContext)
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getOffers = async () => {
            const res = await fetch("/api/offers");
            const { data } = await res.json();
            setOffers(data);
        };
        getOffers();
        setLoading(false);
    }, []);
    return(
    <Wrapper>
        {loading ? (
        <Loading />
        ) : (<section>
            {offers?.map((item)=>{
                console.log("offer", item)

                setServiceProvider(user.name)
                return(
                <>
                    {item.serviceProvider==serviceProvider ? (
                    <Section>
                        <Div> service Title: {item.title}</Div>
                        <Div> Description: {item.description}</Div>
                        <Div> clientEmail: {item.clientEmail}</Div>
                        <Div> offer: {item.offer}</Div>
                        {item.isConfirmed == true &&
                        <ConfirmDiv> Offer is confirmed </ConfirmDiv>}
                    </Section>)
                    : <></>}
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
height: 1500px;
`;