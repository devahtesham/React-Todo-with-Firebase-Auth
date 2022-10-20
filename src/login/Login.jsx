import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("uid");
  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log(res);
        localStorage.setItem("uid", res.user.uid); //we do this bcz this tells that user is logged in or not
        setEmail("");
        setPassword("");
        navigate("/todo");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <h1 className="text-center text-dark fw-bolder">login Page</h1>
      <div className="container">
        <form action="" onSubmit={loginHandler}>
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
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
