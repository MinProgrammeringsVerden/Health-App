import React , {useContext} from 'react';
import {Link } from 'react-router-dom';
import {GlobalContext} from '../../context/Provider';

  


const Navbar = (props) => {
      
    const { signinState } = useContext(GlobalContext);
    console.log(signinState)
    const { isSignedin } = signinState;
    console.log('signinState' , signinState)



     return ( 
        <div className = 'container'>
            <ul>
          
                        
                {isSignedin === true && (

                <div>
                    
                    <li><Link to = '/profile'></Link></li>
                    
                </div>

                )}
                   
               

                {isSignedin === false && (
                 <div>
                    <li><Link to = '/signup'></Link></li>
                    <li><Link to = '/signin'></Link></li>
                    
                 </div>
                )}
                
                
                
            </ul>
            
        </div>
     );
}
 
export default Navbar;