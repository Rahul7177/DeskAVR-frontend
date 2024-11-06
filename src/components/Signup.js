import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../stylesheets/Signup.css'

const Signup = () => {

  const navigate = useNavigate();
  const [user,setUser] = useState({
    name: "",email: "",password: "",repwd: ""
  });

  let name,value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value; 

    setUser({...user, [name]:value})
  }

  const validate = (e) => {
    if(user.password == user.repwd)
    {
      postData(e);
    }
    else
    {
      window.alert("Re password is not matching!");
    }
  }

  const postData = async (e) => {
    e.preventDefault();
    const {name, email, password} = user;
    const res = await fetch("https://auto-vista-server.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name:name,
        email:email,
        password:password
      }),
      credentials: 'include',
    });

    const data  = await res.json();
    if(data.status === 422 || !data)
    {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else 
    {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate('/');
    }

  }


  return (
    <div className='signin-container'>
        <div className='signin-section'>
            <div className='signin-header'>
                <h1>Sign Up</h1>
            </div>
            <form method='POST'>
                <label htmlFor="name">Name</label>
                <input type='text' name='name' placeholder='Name' value={user.name} onChange={handleInputs}/>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' value={user.email} onChange={handleInputs}/>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Password' value={user.password} onChange={handleInputs}/>
                <label htmlFor="repwd">Re-Enter Password</label>
                <input type="password" name='repwd' placeholder='Re-type Password' value={user.repwd} onChange={handleInputs}/>
                <button type='submit' name='signup' value="register" onClick={validate}>Sign Up</button>
            </form>
            <div className='signin-bottom'>
              <span>Already have an account? <span><Link to='/login' className='login'>Log In</Link></span></span>
            </div>
        </div>
    </div>
  )
}

export default Signup