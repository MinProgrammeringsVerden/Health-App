import React  , {useContext , useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {GlobalContext} from '../../context/Provider'
import {USER_LOGOUT} from '../../constans/userConstans';

const Loggout = (props) => {
    const {signinDispatch , isSignedin} = useContext(GlobalContext);
    const history = useHistory();

      
     useEffect(() => {
      // Using an IIFE
      (async() => {
          console.log('I am called only once after the initial render');
          
          signinDispatch({ type:USER_LOGOUT })
          await axios.get("http://localhost:5000/users/loggout" );
          console.log('logging out' );
          history.push('/')

         // {isSignedin === false && (history.push('/'))}
     })();
    }, []);

    
     return (
        <div>
         
        </div>
    );
}
 
export default Loggout;

