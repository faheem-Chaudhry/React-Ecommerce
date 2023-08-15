import React, { useEffect, useState, useContext } from "react";
import CartContext from "../store/cart-context";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for input changes
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // let email;
    // let pass;
    async function fetchData() {
      const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/users.json');
      const data = await response.json();
      for (const key in data) {
        if (data[key].email === username && data[key].password === password) {
          console.log('ok');
          // props.setIsLogin(false);
          // props.setFromLogin(true);
          cartCtx.addEmail(username);
          if(cartCtx.items.length === 0){
            navigate('/')
          }
          else{
            navigate('/cart')
          }
          
        }

      }
      // email=data['email'];
      // pass=data['password'];
      // console.log(email)

    }
    fetchData().then(() => {
      console.log('Username:', username);
      console.log('Password:', password);
     
      setUsername('');
      setPassword('');
    })


  };
  const handleChange = () => {
    navigate('/admin-login')
    // props.setAdminLogin(true);
  }
  const signUpHandler = () =>{
      navigate('/signup')
    // props.isSignUp(true);
  }
  
  return (
    <div>
      <h2>Login</h2>
      <input type="checkbox"
        id="admin"
        name="admin"
        value="admin"
        onChange={handleChange} />
      <label htmlFor="admin"> login as admin</label><br></br>
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
      <Link to='/'>Go to Home</Link>
    </div>
  );
}

export default Login