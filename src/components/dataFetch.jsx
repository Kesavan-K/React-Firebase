import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
const DataFetch = () => {
      
    const [users, setUsers] = useState([]);

    const getUsersDetails = collection(db, "users")

    useEffect(()=>{
          const getUsers = async () =>{
            try{
              const data = await getDocs(getUsersDetails)
              // to filter the data
              const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id,
              }));
              console.log(filteredData);
              setUsers(filteredData);
              console.log(data);
            }
            catch(e){
                console.log(e);
            }
          } 

          getUsers();
    }, [])
  return (
    <div>
        {/* {users.map((user,index)=> (
            <div key={index}>
                <h1>{user.title}</h1>
                <p>My name is : {user.name}</p>
                <p>My age is : {user.age}</p>
                <p>My Fathername is : {user.Fname}</p>
                <p>My Mothername is : {user.Mname}</p>
            </div>
        ))} */}
    </div>
  )
}

export default DataFetch