import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentRequestContext } from "./CurrentRequestContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";

const Offers = () => {
    const [loading, setLoading] = useState(false);

    const {serviceProvider} = useContext(CurrentRequestContext)
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
    <>
    {loading ? (
        <Loading />
        ) : (<section>
    {offers?.map((item)=>{
                if(item.serviceProvider===serviceProvider){
                return(
                    <section onClick={() => navigateMyService(`/services/${item._id}`)}>
                    <div> service Title: {item.title}</div>
                    <div> serviceId: {item.serviceId}</div>
                    <div>Offer: {item.offer}</div>
                    </section>)
                }
                })}
            </section>
        )}    
    </>
    )
}

export default Offers;