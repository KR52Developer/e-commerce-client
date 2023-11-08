import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';



const Login = () => {


    const { users, setLoggedUser } = useContext(UserContext);
    // console.log(users);

    const [loginUser, setloginUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    const handleonChange = (e) => {

        const { name, value } = e.target;
        setloginUser((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginUser.email) {
            setError(true);
            setErrorText("Enter email*");
        } else if (!loginUser.password) {
            setError(true);
            setErrorText("Enter password*");
        } else {
            // let allusers = Object.values(users);
            // console.log(allusers);
            let getLoggedinUserDetails = users.find((user) =>
                user.email === loginUser.email && user.password === loginUser.password
            );

            // console.log(getLoggedinUserDetails);

            if (getLoggedinUserDetails) {
                setLoggedUser(getLoggedinUserDetails);
                // const { _id } = getLoggedinUserDetails;
                // console.log(_id);
                alert("User successfully logged in");
                navigate(`/`);


                // Save the logged-in user's data in sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify(getLoggedinUserDetails));
            } else {
                setError(true);
                setErrorText("Email/Password Wrong*");
            }

        };
    };




    return (
        <div className="formContainer login" >

            <div className="formWrapper">

                {/* <div className="registerImageWrapper">
                    <span className="logo">Trend-Cart</span>
                    <img src={RegisterImage} alt="" width={300} height={280} />
                    <p>You do have an account? <Link to="/login">Login</Link ></p>
                </div> */}
                <div className='formElements'>
                    <span className="logo">Trend-Cart</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>

                        <input type="email" placeholder='Enter email' name="email" onChange={handleonChange} />
                        <input type="password" placeholder='Enter password' name="password" onChange={handleonChange} />

                        <button>Login</button>
                        {error && <span className='error'>{errorText}</span>}
                        <p>New User?<Link to="/register"> Register here!</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    );
};




export default Login;