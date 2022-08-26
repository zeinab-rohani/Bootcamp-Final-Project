import { useEffect } from "react";

useEffect(() => {
fetch(`/api/items/${itemId}`, {
    method: "GET",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    },
})
    .then((res) => {
    return res.json();
    })
    .then((data) => {
    setItemtDetails(data["data"]);
    setRecentlyViewed((prevItem) => [...prevItem, data["data"]]);
    });
}, [itemId]);
const ServiceDetail = () => {

    return (
        <></>
    )
}

export default ServiceDetail;