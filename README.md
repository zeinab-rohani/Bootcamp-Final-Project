# Bootcamp-Final-Project

shadi.rohani@yahoo.com
Shadi28541

zeinab.rohani@gmail.com
Zeinab28541


const UserList = () => {
  const [data, setData] = useState([
    {
      id: "",
      email: "",
      website: "",
      phone: "",
      name: ""
    }
  ]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json.map((object) => {
          setData((data) => [
            ...data,
            {
              id: object.id,
              email: object.email,
              website: object.website,
              phone: object.phone,
              name: object.name
            }
          ]);
        });
      });
  }, []);

  return (
    <>
      <div>
        <ul>
          {data.map((info) => {
            <li key = {info.id}></li>;
          })}
        </ul>
      </div>
    </>
  );
};