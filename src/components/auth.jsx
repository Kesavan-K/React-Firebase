import { useState } from "react";
import { auth , googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword , signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    // console.log(auth.currentUser.photoURL);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            console.log("User created successfully");
        } catch (error) {
            setError(error.message);
            console.error("Error creating user:", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("User Sign In");
        } catch (error) {
            setError(error.message);
            console.error("Error creating user:", error);
        }
    };

    const LogOut = async () => {
        try {
            await signOut(auth);
            console.log("User LogOut");
        } catch (error) {
            setError(error.message);
            console.error("Error creating user:", error);
        }
    };

    return (
        <>
            <div>
                Email: <input type="text" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} /> <br />
                Pass: <input type="password" placeholder="Pass.." onChange={(e) => setPass(e.target.value)} /> <br />
                <button onClick={signIn}>Submit</button> <br />

                 <button onClick={signInWithGoogle}>SignInWithGoogle</button> <br />


                 <button onClick={LogOut}>LogOut</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};

export default Auth;
