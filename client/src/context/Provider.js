import React , {createContext , useReducer} from 'react';

import { USER_SIGNUP_REQUEST ,
    USER_SIGNUP_SUCCESS ,
    USER_SIGNUP_FAIL  ,
    USER_SIGNIN_REQUEST ,
    USER_SIGNIN_SUCCESS ,
    USER_SIGNIN_FAIL ,
    USER_LOGOUT ,
    USER_APPOINTMENT_REQUEST  ,
    USER_APPOINTMENT_SUCCESS , 
    USER_APPOINTMENT_FAIL,
    USER_NEWAPPOINTMENT_REQUEST  ,
    USER_NEWAPPOINTMENT_SUCCESS , 
    USER_NEWAPPOINTMENT_FAIL ,
    USER_DELETEAPPOINTMENT_REQUEST  ,
    USER_DELETEAPPOINTMENT_SUCCESS , 
    USER_DELETEAPPOINTMENT_FAIL 

} from '../constans/userConstans';

import { DOCTOR_LIST_REQUEST ,
    DOCTOR_LIST_SUCCESS ,
    DOCTOR_LIST_FAIL } from '../constans/doctorConstans';



const signupInitialState = {
    isSiningUp:'' , 
    loading:'' ,
    userInfo:''  , 
    error:'', 

}


const signupReducer = (state , action) => {
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return{
                ...state , 
                isSiningUp:true , 
                loading:true ,
                userInfo:false , 
                error:false
            }

        case USER_SIGNUP_SUCCESS:
                return{
                    ...state , 
                    isSiningUp:false , 
                    loading:false ,
                    userInfo: action.payload , 
                    error:false
                }

        case USER_SIGNUP_FAIL:
                    return{
                        ...state , 
                        isSiningUp:false , 
                        loading:false ,
                        userInfo:false , 
                        error:action.payload
                    }  
                    
         default:
             return state;
    }}



const signinInitialState = {
    isSignedin:'' , 
    loading:'' ,
    userInfo:''  , 
    error:'', 

}


const signinReducer = (state , action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return{
                ...state , 
                isSignedin:false , 
                loading:true ,
                userInfo:false , 
                error:false
            }

        case USER_SIGNIN_SUCCESS:
                return{
                    ...state , 
                    isSignedin:true , 
                    loading:false ,
                    userInfo: action.payload , 
                    error:false
                }

        case USER_SIGNIN_FAIL:
                    return{
                        ...state , 
                        isSignedin:false , 
                        loading:false ,
                        userInfo:false , 
                        error:action.payload
                    } 
                    
        case USER_LOGOUT:
                        return{
                            ...state , 
                            isSignedin:false , 
                            loading:false ,
                            userInfo:false , 
                            error:false
                        }  
                    
         default:
             return state;
    }


}

const appointmentInitialState = {
    loading:'' ,
    userappointments:''  , 
    error:'', 

}


const appointmentReducer = (state , action) => {
    switch(action.type){
        case USER_APPOINTMENT_REQUEST:
            return{
                ...state , 
                loading:true ,
                userappointments:false , 
                error:false
            }

        case USER_APPOINTMENT_SUCCESS:
                return{
                    ...state , 
                    loading:false ,
                    userappointments: action.payload , 
                    error:false
                }

        case USER_APPOINTMENT_FAIL:
                    return{
                        ...state , 
                        loading:false ,
                        userappointments:false , 
                        error:action.payload
                    }  
                    
         default:
             return state;
    }}


    const newappointmentInitialState = {
        loading:'' ,
        newappointment:''  , 
        error:'', 
    
    }
    
    
    const newappointmentReducer = (state , action) => {
        switch(action.type){
            case USER_NEWAPPOINTMENT_REQUEST:
                return{
                    ...state , 
                    loading:true ,
                    newappointment:false , 
                    error:false
                }
    
            case USER_NEWAPPOINTMENT_SUCCESS:
                    return{
                        ...state , 
                        loading:false ,
                        newappointment: action.payload , 
                        error:false
                    }
    
            case USER_NEWAPPOINTMENT_FAIL:
                        return{
                            ...state , 
                            loading:false ,
                            newappointment:false , 
                            error:action.payload
                        }  
                        
             default:
                 return state;
        }}




const doctorlistInitialState = {
    loading:'' ,
    doctorlist:''  , 
    error:'', 

}


const doctorlistReducer = (state , action) => {
    switch(action.type){
        case DOCTOR_LIST_REQUEST:
            return{
                ...state , 
                loading:true ,
                doctorlist:false , 
                error:false
            }

        case DOCTOR_LIST_SUCCESS:
                return{
                    ...state , 
                    loading:false ,
                    doctorlist: action.payload , 
                    error:false
                }

        case DOCTOR_LIST_FAIL:
                    return{
                        ...state , 
                        loading:false ,
                        doctorlist:false , 
                        error:action.payload
                    }  
                    
         default:
             return state;
    }}

    const deleteappointmentInitialState = {
        loading:'' ,
        appointments:[] , 
        error:'', 
    
    }
    
    
    const deleteappointmentReducer = (state , action) => {
        switch(action.type){
            case USER_DELETEAPPOINTMENT_REQUEST:
                return{
                    ...state , 
                    loading:true ,
                    appointments:[] , 
                    error:false
                }
    
            case USER_DELETEAPPOINTMENT_SUCCESS:
                    return{
                        ...state , 
                        loading:false ,
                        appointments:state.appointments.filter(a => a._id !== action._payload) , 
                        error:false
                    }
    
            case USER_DELETEAPPOINTMENT_FAIL:
                        return{
                            ...state , 
                            loading:false ,
                            appointments:[] , 
                            error:action.payload
                        }  
                        
             default:
                 return state;
        }}



 export const GlobalContext = createContext({});

 export const GlobalProvider = ({children}) => {

   const [signupState , signupDispatch] = useReducer(signupReducer , signupInitialState) ;
   const [signinState , signinDispatch] = useReducer(signinReducer , signinInitialState) ;
   const [appointmentState , appointmentDispatch] = useReducer( appointmentReducer , appointmentInitialState) ;
   const [newappointmentState , newappointmentDispatch] = useReducer( newappointmentReducer , newappointmentInitialState) ;
   const [deleteappointmentState , deleteappointmentDispatch] = useReducer( deleteappointmentReducer , deleteappointmentInitialState) ;
   const [doctorlistState , doctorlistDispatch] = useReducer(doctorlistReducer , doctorlistInitialState) ;


    return(
     <GlobalContext.Provider value={{signupState , signupDispatch ,signinState , signinDispatch , appointmentState , appointmentDispatch  ,newappointmentState , newappointmentDispatch  ,deleteappointmentState , deleteappointmentDispatch , doctorlistState , doctorlistDispatch }}>
         {children}
     </GlobalContext.Provider>
    )

}