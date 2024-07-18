import { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const WriteData = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newFname, setNewFname] = useState("");
  const [newMname, setNewMname] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  // Reference to the Firestore collection
  const usersCollection = collection(db, "users");

  // File Upload Storage
  const [fileUpload, setFileupload] = useState(null)
 
  // Fetch user data from Firestore
  const getUsers = async () => {
    try {
      const data = await getDocs(usersCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(filteredData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Add new user data to Firestore
  const setData = async () => {
    try {
      await addDoc(usersCollection, {
        name: newName,
        age: newAge === "" ? null : Number(newAge),
        FName: newFname,
        MName: newMname,
        Checked: isChecked,
        userId : auth?.currentUser?.uid,
      });
      getUsers();
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  // Delete user data from Firestore
  const deleteUsers = async (id) => {
    try {
      const deleteUser = doc(db, "users", id);
      await deleteDoc(deleteUser);
      console.log("Data Deleted Successfully!!!");
      setUsers(users.filter(user => user.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // Update user data in Firestore
  const updateUser = async () => {
    try {
      const userDoc = doc(db, "users", editingUserId);
      await updateDoc(userDoc, {
        name: newName,
        age: newAge === "" ? null : Number(newAge),
        FName: newFname,
        MName: newMname,
        Checked: isChecked,
      });
      getUsers();
      resetForm();
      setEditingUserId(null);
    } catch (e) {
      console.log(e);
    }
  };

  // Fill form fields for editing
  const startEditing = (user) => {
    setEditingUserId(user.id);
    setNewName(user.name);
    setNewAge(user.age !== null ? user.age.toString() : "");
    setNewFname(user.FName);
    setNewMname(user.MName);
    setIsChecked(user.Checked);
  };

  // Reset form fields
  const resetForm = () => {
    setNewName("");
    setNewAge("");
    setNewFname("");
    setNewMname("");
    setIsChecked(false);
  };

  const uploadFile = async () =>{
      if(!fileUpload){
             console.log("No files available!!!");
      }
      const fileFolder = ref(storage, `projectFiles/${fileUpload.name}`)
      try{
      await uploadBytes(fileFolder, fileUpload)
      console.log("File Upload Successfully");
      }
      catch(e){
        console.log("Not Uploaded",e);
      }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name.. "
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="number"
          placeholder="Age.. "
          value={newAge}
          onChange={(e) => setNewAge(Number(e.target.value))}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Father's Name.. "
          value={newFname}
          onChange={(e) => setNewFname(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Mother's Name.. "
          value={newMname}
          onChange={(e) => setNewMname(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          Is Details Checked
        </label>
        {editingUserId ? (
          <button onClick={updateUser} style={{ marginRight: "10px" }}>Update User</button>
        ) : (
          <button onClick={setData} style={{ marginRight: "10px" }}>Submit Data</button>
        )}
        <button onClick={resetForm}>Reset</button>
      </div>

      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h1>{user.Checked ? "Checked" : "Unchecked"}</h1>
          <p>My name is: {user.name}</p>
          <p>My age is: {user.age}</p>
          <p>My Father's name is: {user.FName}</p>
          <p>My Mother's name is: {user.MName}</p>
          <button onClick={() => startEditing(user)} style={{ marginRight: "10px" }}>Edit</button>
          <button onClick={() => deleteUsers(user.id)}>Delete User</button>
        </div>
      ))}

      <div>
         <input type="file" onChange={(e) => setFileupload(e.target.files[0])} />
         <button onClick={uploadFile}>uploadFile</button>
      </div>
    </div>
  );
};

export default WriteData;
