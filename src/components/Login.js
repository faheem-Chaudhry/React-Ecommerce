import React, { useEffect, useState, useContext } from "react";
import CartContext from "../store/cart-context";
const Login = (props) => {
  const cartCtx = useContext(CartContext)
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
    // let email;
    // let pass;
    async function fetchData() {
      const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/users.json');
      const data = await response.json();
      for (const key in data) {
        if (data[key].email === username && data[key].password === password) {
          console.log('ok');
          props.setIsLogin(false);
          props.setFromLogin(true);
          cartCtx.addEmail(username)
        }

      }
      // email=data['email'];
      // pass=data['password'];
      // console.log(email)

    }
    fetchData().then(() => {
      console.log('Username:', username);
      console.log('Password:', password);
      // console.log('email from server:', email);
      // console.log('Password from server:', pass);
      // if (email === username && pass === password) {
      //   console.log('ok');
      //   props.setIsLogin(true);
      // }
      // else {
      //   console.log('not ok');
      //   // props.setIsLogin(false);
      // }
      setUsername('');
      setPassword('');
    })


  };
  const handleChange = () => {
    props.setAdminLogin(true);
  }
  const signUpHandler = () =>{
    props.isSignUp(true);
  }
  const onClickHomeHandler = () => {
    props.setIsLogin(false);
    //props.setFromLogin(true);
  }
  return (
    <div>
      <h2>Login</h2>
      <input type="checkbox"
        id="admin"
        name="admin"
        value="admin"
        onChange={handleChange} />
      <label for="admin"> login as admin</label><br></br>
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
          <button type="submit">Login</button>
          <button onClick={signUpHandler}>SignUp</button>
        </div>
      </form>
      <h2 onClick={onClickHomeHandler}>Go to Home</h2>
    </div>
  );
}

export default Login