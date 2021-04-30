import React  , {useState , useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {GlobalContext} from '../../context/Provider'
import {USER_SIGNUP_REQUEST  ,
    USER_SIGNUP_SUCCESS , 
    USER_SIGNUP_FAIL} from '../../constans/userConstans';




const SignUp = (props) => {

  const[name , setName] = useState('');
  const[surname , setSurname ] = useState('');
  const[personalnum , setPersonalnum] = useState('');
  const[mobile , setMobile] = useState('');
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const[passwordCheck , setPasswordCheck] = useState('');
  const {signupDispatch} = useContext(GlobalContext)

  const history = useHistory();


  const handleSubmit =  async (e) =>{
      e.preventDefault()
    console.log({name , surname , personalnum , mobile , email , password , passwordCheck});

    signupDispatch({ type:USER_SIGNUP_REQUEST })
      try{
      const {data} = await axios.post("http://localhost:5000/users/signup" , { name , surname , personalnum , mobile , email , password , passwordCheck});
     console.log('newUser created' , {data});
     signupDispatch({ type:USER_SIGNUP_SUCCESS , payload:data })
     history.push('/signin')

    }catch(error){
        signupDispatch({ type:USER_SIGNUP_FAIL , payload:error.message })
        console.log(' error under creating new user');
      }
 };
  

    const handelRedirectionToHome =(e)=>{
    e.preventDefault();
    history.push('/')
    
   }
  
    return (
        <div className = 'container'>

            <h1> Please Sign Up</h1>

          <div>

            <form onSubmit={handleSubmit} >
                    <label>
                        Name:
                        <input type='text' placeholder='name' value ={name} onChange={ e =>{setName(e.target.value)}} />
                    </label>
                    <label>
                        Surname:
                        <input type='text' plsceholder='surname' value ={surname} onChange ={ e=>{setSurname(e.target.value)}} />
                    </label>
                    <label>
                        ID number:
                        <input type='text' placeholder='personalnum' value = {personalnum} onChange={ e =>{setPersonalnum(e.target.value)}} />
                    </label>
                    <label>
                        Mobile:
                        <input type='text' placeholder='mobile' value ={mobile} onChange ={ e =>{setMobile(e.target.value)}} />
                    </label>
                    <label>
                        Email:
                        <input type='text' placeholder='email' value ={email} onChange={ e =>{setEmail(e.target.value)}} />
                    </label>
                    <label>
                        Password:
                        <input type='text' placeholder='password' value ={password} onChange={ e =>{setPassword(e.target.value)}} />
                    </label>
                    <label>
                        Password:
                        <input type='text' placeholder='passwordCheck' value ={passwordCheck} onChange={ e =>{setPasswordCheck(e.target.value)}} />
                    </label>
                  <button  className='btn' type='submit'>Send</button>
            </form>
           
       </div>
       <div>

           <button  className='btn' type ='button' onClick= {e => handelRedirectionToHome(e)}>back to Home page</button>
          
      </div>

    </div>
    );
}
 
export default SignUp;