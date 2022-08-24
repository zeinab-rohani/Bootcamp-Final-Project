
// export const ProductList = () => {
// const [items, setItems] = useState([]);
// const [loading, setLoading] = useState(false);
// const [currentPage, setCurrentPage] = useState(1);
// const [itemsPerPage] = useState(5);
// const { cart, setCart } = useContext(CurrentUserContext);

// let history = useHistory();

// useEffect(() => {
//     const fetchItems = async () => {
//     setLoading(true);
//     const res = await fetch("/api/companies/suggested");
//     const { data } = await res.json();
//     setItems(data);
//     setLoading(false);
//     };

//     fetchItems();
// }, []);

//     return (
//     <>
//         {loading ? (
//         <Loading />
//         ) : (
//             <>
//             </>
//         )}
//     </>
// )}