import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { fetchUser } from "../Reducer/Action";
import { ToastContainer, toast } from "react-toastify";
import logoAdmin from "../../src/assets/img/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const { REACT_APP_PATH2 } = process.env;

function LoginForm({ className }) {

    
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    const notify = () =>
        toast.warn("Username หรือ Password ไม่ถูกต้อง", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: Username,
            password: Password,
        };
        const id = toast.loading("Please wait...");
        await axios
            .post(`${REACT_APP_PATH2}/admin/api/login`, data)
            .then((res) => {
                if (res.data.error) {
                    toast.update(id, { render: "Login fail", type: "error", isLoading: false });
                    notify();
                } else {
                    console.log(res.data)
                    toast.update(id, { render: "Login successful", type: "success", isLoading: false });
                    localStorage.setItem("mini-session", JSON.stringify(res.data));
                    dispatch(fetchUser(res.data));
                   navigate("/News");
                }
            })
            .catch(() => {
                console.log("error");
            });
    };

    return (
        <div>
            <div className={className}>
                <div className="BG">
                    <div className="center">
                        <div className="a" style={{ paddingLeft: "38%" }}>
                            <img src={logoAdmin} alt="Girl in a jacket" width="100" height="100"></img>
                        </div>

                        <h1>Login</h1>
                        <form method="post">
                            <div className="txt_field">
                                <input
                                    type="text"
                                    required
                                    placeholder="Username"
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <span></span>
                                <label>Username</label>
                            </div>
                            <div className="txt_field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <span></span>
                                <label>Password</label>
                            </div>

                            <input value="Login" type="submit" onClick={handleSubmit} />
                            <div className="signup_link">DLICT CMA1 ©Copyright 2022 All rights reserved.</div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default styled(LoginForm)`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }
    .BG {
        margin: 0;
        padding: 0;
        background-color: #0093e9;
        background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

        height: 100vh;
        overflow: hidden;
    }
    .center {
        background: linear-gradient(120deg, #2980b9, #8e44ad);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        background: white;
        border-radius: 10px;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
    }
    .center h1 {
        text-align: center;
        padding-bottom: 25px;
        border-bottom: 1px solid silver;
    }
    .center form {
        padding: 0 40px;
        box-sizing: border-box;
    }
    form .txt_field {
        position: relative;
        border-bottom: 2px solid #adadad;
        margin: 30px 0;
    }
    .txt_field input {
        width: 100%;
        padding: 0 5px;
        height: 40px;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;
    }
    .txt_field label {
        position: absolute;
        top: 50%;
        left: 5px;
        color: #adadad;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        transition: 0.5s;
    }
    .txt_field span::before {
        content: "";
        position: absolute;
        top: 40px;
        left: 0;
        width: 0%;
        height: 2px;
        background: #2691d9;
        transition: 0.5s;
    }
    .txt_field input:focus ~ label,
    .txt_field input:valid ~ label {
        top: -5px;
        color: #2691d9;
    }
    .txt_field input:focus ~ span::before,
    .txt_field input:valid ~ span::before {
        width: 100%;
    }
    .pass {
        margin: -5px 0 20px 5px;
        color: #a6a6a6;
        cursor: pointer;
    }
    .pass:hover {
        text-decoration: underline;
    }
    input[type="submit"] {
        width: 100%;
        height: 50px;
        border: 1px solid;
        background: #2691d9;
        border-radius: 25px;
        font-size: 18px;
        color: #e9f4fb;
        font-weight: 700;
        cursor: pointer;
        outline: none;
    }
    input[type="submit"]:hover {
        border-color: #2691d9;
        transition: 0.5s;
    }
    .signup_link {
        margin: 30px 0;
        text-align: center;
        font-size: 16px;
        color: #666666;
    }
    .signup_link a {
        color: #2691d9;
        text-decoration: none;
    }
    .signup_link a:hover {
        text-decoration: underline;
    }
`;
