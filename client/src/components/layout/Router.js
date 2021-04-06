import React , {useContext} from 'react';
import { Route , Switch } from  'react-router-dom';
import Home from '../layout/Home';
import SignUp from '../layout/SignUp';
import SignIn from '../layout/SignIn';
import Profile from '../layout/Profile';
import Loggout from '../layout/Loggout';




const Router = (props) => {
  



    return ( 
        <Switch>
               <Route path ='/' component={ Home } exact/>
               <Route path ='/signin' component={ SignIn } />
               <Route path ='/signup' component={ SignUp } />
               <Route path ='/profile' component={ Profile } />
               <Route path ='/loggout' component={ Loggout} />
            

              
          
        </Switch>
     );
}
 
export default Router;