import React, { useEffect, useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";
import { db, addDoc } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem("uid");
  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log(res);
        const myObj = {
          name,
          email,
          uid: res.user.uid,
        };
        const db_collection = collection(db, "users"); // this needed when we use addDoc
        // await addDoc(db_collection, myObj); // we also use this but it generate auto id of a user but if we want to create a custom id we use setDoc(doc(db,collection_name,custom_id),data)
        const docRef = doc(db, "users", res.user.uid); // here we store user details in firestore with a key that is his uid
        await setDoc(docRef, myObj);
        // console.log(name, "name");
        // console.log(email, "email");
        // console.log(password, "password");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <h1 className="text-center text-dark fw-bolder">SignUp Page</h1>
      <div className="container">
        <form onSubmit={signupHandler}>
          <div className="input-group mb-3">
            <label htmlFor="name" className="mb-2 fw-bold">
              Name
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Your Name"
              className="form-control w-100"
              onChange={nameChangeHandler}
              value={name}
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="email" className="mb-2 fw-bold">
              Email Address
            </label>

            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Your Email"
              className="form-control w-100"
              onChange={emailChangeHandler}
              value={email}
            />
          </div>
          <div className="input-group mb-3">
            <label htmlFor="pass" className="mb-2 fw-bold">
              Password
            </label>
            <br />
            <input
              type="password"
              name=""
              id=""
              placeholder="xxxxxxxxx"
              className="form-control w-100"
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary">SignUp</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
