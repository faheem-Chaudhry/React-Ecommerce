import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../store/cart-context';

const LoginPage = () => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  // let email;
  // let pass;
  // useEffect(() => {

  //   async function fetchData() {
  //     const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/admin.json');
  //     const data = await response.json();
  //     email = data['email'];
  //     pass = data['password'];
  //     console.log(email)

  //   }
  //   fetchData()
  // }, [])
  // State to hold the user input for username and password
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
    let email: string;
    let pass: string;
    async function fetchData() {
      const response = await fetch('https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/admin.json');
      const data = await response.json();
      email=data['email'];
      pass=data['password'];
      console.log(email)

    }
    fetchData().then(()=>{
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('email from server:', email);
      console.log('Password from server:', pass);
      if (email === username && pass === password) {
        console.log('ok');
        //props.setIsLogin(false);
        cartCtx.setAdminLogin(true);
        localStorage.setItem('admin',JSON.stringify(true))
        console.log(localStorage)
        navigate('/admin')
      }
      else {
        console.log('not ok');
       // props.setIsLogin(false);
      }
      setUsername('');
      setPassword('');
    })
   

  };
  const loginHandler = () =>{
    navigate('/login')
    // props.adminLogin(false)
  }

  return (
    <div>
      <h2>Login</h2>
      <h2>Welcome to admin panel</h2>
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
          <button onClick={loginHandler}>Login as user</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
