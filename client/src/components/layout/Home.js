import React , {useContext} from 'react';
import { useHistory } from "react-router-dom";
import {GlobalContext} from '../../context/Provider';

const Home = (props) => {

    const { signinState } = useContext(GlobalContext);
    console.log(signinState);
    const { isSignedin } = signinState;
    console.log('signinState' , signinState) ;   
    
    const history = useHistory()
    
    const handelRedirectionToSignIn =(e)=>{
     e.preventDefault();
    {isSignedin === true? (history.push('/profil')) : (history.push('/signin'))}
     
    }
    const handelRedirectionToSignUp =(e)=>{
        e.preventDefault();
        {isSignedin === true? (history.push('/profil')) : (history.push('/signup'))}
        
       }

    return (
        <div>
           <h1>Please Sign Up or Sign In</h1>
           <button type ='button' onClick= {e => handelRedirectionToSignIn(e)}>Sign in</button>
           <button type ='button' onClick= {e => handelRedirectionToSignUp(e)}>Sign up</button>
        </div>
    );
}
 
export default Home;