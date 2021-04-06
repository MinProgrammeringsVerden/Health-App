import React  , {useState , useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {GlobalContext} from '../../context/Provider'
import {USER_SIGNIN_REQUEST  ,
    USER_SIGNIN_SUCCESS , 
    USER_SIGNIN_FAIL} from '../../constans/userConstans';



  const SignIn = (props) => {

    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const {signinDispatch} = useContext(GlobalContext);
    
    const history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log({ email , password });
    
        signinDispatch({ type:USER_SIGNIN_REQUEST })
          try{
         const {data} = await axios.post("http://localhost:5000/users/signin" , { email , password });
         console.log('signing in ' , {data});
         signinDispatch({ type:USER_SIGNIN_SUCCESS , payload:data });
          history.push('/profile')
    
    
        }catch(error){
            signinDispatch({ type:USER_SIGNIN_FAIL , payload:error.message })
            console.log(' error under signing in');
          }
    
    }

    const handelRedirectionToHome =(e)=>{
        e.preventDefault();
        history.push('/')
        
       }



    return (
        <div>
             <h1>Sign In</h1>
         <div>
               <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type='text' placeholder='email' value ={email} onChange={ e =>{setEmail(e.target.value)}} />
                    </label>
                    <label>
                        Password:
                        <input type='text' placeholder='password' value ={password} onChange={ e =>{setPassword(e.target.value)}} />
                    </label>
                    <button type='submit'>Send</button>
               </form>
         </div>

         <div>
           <button type ='button' onClick= {e => handelRedirectionToHome(e)}>back to Home page</button>
          
        </div>


        </div>
    );
}
 
export default SignIn;