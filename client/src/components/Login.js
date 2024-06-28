import React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Login.css'
function Login() {
  let navigate = useNavigate();
  let {user,setUser} = useContext(UserContext)
  console.log(user)
const { register, handleSubmit, formState: { errors } } = useForm();
function handleForm(userCredentials){
  //comapring username
  fetch(`http://localhost:4002/users?username=${userCredentials.username}`,{method:"GET"})
  .then(res=>res.json())
  .then(newuserObj=>
    {
      //checking whether the entered username exists or not
      if(newuserObj.length==0)
      {
        alert("Faculty ID not found");
      }
      else{
        console.log(newuserObj[0])
        setUser([newuserObj[0]])
        navigate('/AppraisalForm',{state:  newuserObj[0]})

      }
    }
    )
  
}
// fetch(`http://localhost:4002/users?username=${3233}`,{method:"GET"})
//   .then(res=>res.json())
//   .then(newuserObj=>
//     {
//       //checking whether the entered username exists or not
//       if(newuserObj.length==0)
//       {
//         alert("Faculty ID not found");
//       }
//       else{
//         console.log(newuserObj[0])
//         setUser([newuserObj[0]])
//         navigate('/AppraisalForm',{state:  newuserObj[0]})

//       }
//     }
//     )
  return (
    <div className="container">
  <div className="page-container">
  <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <label>Faculty ID:</label>
          <input type="text" {...register('username')} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/Register">Register</Link> instead.
      </p>
    </div>      
  </div>
</div>
  );
}

export default Login;
