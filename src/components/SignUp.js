import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Event handler for input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: password
            }),
        }).then(() => {
            setUsername('');
            setPassword('');
            props.isSignUp(false);
            navigate('/login')
           
        })



    };
    const handleChange = () => {
        props.setAdminLogin(true);
    }
    const loginHandler = () => {
        props.isSignUp(false);
        navigate('/login')
    }
    return (
        <div>
            <h2>SignUp </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">SignUp</button>
                    <button onClick={loginHandler}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp