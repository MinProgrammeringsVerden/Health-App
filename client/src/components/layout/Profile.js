import React , {useState , useEffect , useContext} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import {GlobalContext} from '../../context/Provider'
import { useHistory } from "react-router-dom";
import { DOCTOR_LIST_REQUEST ,
         DOCTOR_LIST_SUCCESS ,
         DOCTOR_LIST_FAIL } from '../../constans/doctorConstans';
import {USER_APPOINTMENT_REQUEST  ,
        USER_APPOINTMENT_SUCCESS , 
        USER_APPOINTMENT_FAIL,
        USER_NEWAPPOINTMENT_REQUEST  ,
        USER_NEWAPPOINTMENT_SUCCESS , 
        USER_NEWAPPOINTMENT_FAIL  , 
        USER_DELETEAPPOINTMENT_REQUEST  ,
        USER_DELETEAPPOINTMENT_SUCCESS , 
        USER_DELETEAPPOINTMENT_FAIL , 
            USER_LOGOUT        }from '../../constans/userConstans';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';


   
 import "react-datepicker/dist/react-datepicker.css";
 import 'bootstrap/dist/css/bootstrap.min.css';





 const Profile = (props) => {

    const [doctorList, setDoctorList] = useState([]);
    const [doctor, setDoctor] = useState('');
    const [appointment, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState('');
    const [deleteAppointment, setDeleteAppointment] = useState('');
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState( setHours(setMinutes(new Date(), 0), 8));
    const { doctorlistDispatch , newappointmentDispatch  , appointmentDispatch ,  deleteappointmentDispatch  } = useContext(GlobalContext);
    const { signinDispatch } = useContext(GlobalContext);
    const { isSignedin } = signinDispatch ;

    const history = useHistory()
    //console.log(appointmentState)
    //const { loading , userappointments ,error } = appointmentState
    //const visits = appointment

   
    
    
         useEffect(() => {
            // Using an IIFE

            (async() => {
                console.log('I am called only once after the initial render');
                doctorlistDispatch({ type:DOCTOR_LIST_REQUEST })
                try{
                const {data} = await axios.get("http://localhost:5000/doctors");
                console.log('doctorList' , {data});
                doctorlistDispatch({ type:DOCTOR_LIST_SUCCESS, payload:data});
                setDoctorList(data)
                
                }catch(error){
                doctorlistDispatch({ type:DOCTOR_LIST_FAIL, payload:error.message });
                }
            })();
          }, []);


          useEffect(() => {
            // Using an IIFE

            (async function fetchingAppointments(){
                console.log('I am called only once the appointments from the database is fetched');
                
                    appointmentDispatch({ type:USER_APPOINTMENT_REQUEST })
                      try{
                     const {data} = await axios.get("http://localhost:5000/users/:id");
                     console.log('fetching appointments');
                     appointmentDispatch({ type:USER_APPOINTMENT_SUCCESS , payload:data })
                     console.log('datatatatatat' , data)
                     setAppointments(data);
                     console.log('setAppointments ' ,setAppointments );
                     console.log('appointment ' ,appointment );
                   
                     
                
                    }catch(error){
                        appointmentDispatch({ type:USER_APPOINTMENT_FAIL , payload:error.message })
                      }
                
                })()
           }, [newAppointment , deleteAppointment]);
        


    
    


      const handleSubmit =  async (e) =>{
        e.preventDefault();
        console.log({doctor , startDate , startTime})
        const name = doctor;
        const date = startDate;
        const time = startTime;

        newappointmentDispatch({ type:USER_NEWAPPOINTMENT_REQUEST })
          try{
         const {data} = await axios.post("http://localhost:5000/appointments" , { name , date , time });
         console.log('newappointment' , {data});
         newappointmentDispatch({ type:USER_NEWAPPOINTMENT_SUCCESS , payload:data })
         setNewAppointment(data);
         console.log('newAppointment' , newAppointment)

        }catch(error){
        newappointmentDispatch({ type:USER_NEWAPPOINTMENT_FAIL , payload:error.message })
          }
    };

       
   
        const handleDelete = async (id) => {
     
        console.log('DELETING APPOINTMENT' );
        console.log('ID' , id );

        deleteappointmentDispatch({ type:USER_DELETEAPPOINTMENT_REQUEST })
          try{
         const {data} = await axios.delete(`http://localhost:5000/appointments/${id }`);
         deleteappointmentDispatch({ type:USER_DELETEAPPOINTMENT_SUCCESS , payload:data })
         setDeleteAppointment(data);
         console.log('deleteappointment' , {data});
         console.log('deleteAppointment' , deleteAppointment)

        }catch(error){
        deleteappointmentDispatch({ type:USER_DELETEAPPOINTMENT_FAIL , payload:error.message })
          }
         };



        const  handleLoggout = (e) =>{
             console.log('message from logg out , signinDispatch');
              e.preventDefault();
              history.push('/loggout')}

          

         


    return (
        <div>
              <form onSubmit={handleSubmit}>
                  <div className='container'>
                      <label htmlFor ='doctorList'>
                         Please select your doctor
                      </label>
                      <div>
                          <select name='doctorList' onChange ={e => setDoctor(e.target.value)}>
                              {doctorList.map(doctor =>(
                                <option
                                key={doctor._id}
                                value={doctor.name}
                                >{doctor.name}</option>)
                              )}
                          </select>

                      </div>
                    
                        <div>
                                <div>
                                    <label htmlFor ='datePicker'>
                                        Please select date 
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        minDate={new Date()}
                                        filterDate ={date => date.getDay() !== 6  &&  date.getDay() !== 0}
                                        dateFormat="dd/MM/yyyy"

                                    />

                                </div>
                                <div>
                                    <label htmlFor ='timePicker'>
                                        Please select time
                                    </label> 
                                    <DatePicker
                                            selected={startTime}
                                            onChange={date => setStartTime(date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            minTime={setHours(setMinutes(new Date(), 0), 8)}
                                            maxTime={setHours(setMinutes(new Date(), 30), 15)}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa "
                                    />
                                </div> 
                          </div>
                    
                          <button  type='submit'>Order your appointment</button>
                  </div>
              </form>
              <div>
                  {appointment.appointments?(appointment.appointments.map(a => <div key ={a._id}>
               <ul>
                   <div key ={a._id}>
                   <li>{a.name}</li>
                   <li>{a.time.substring(11 ,16)}</li>
                   <li>{a.date.substring( 0 ,10)}</li>
                   <li><button type ='button' onClick ={e => handleDelete(a._id)} >Cancel your appointment</button></li>
                   </div></ul>
              </div>)): <div> Your appointments list is empty</div>}
         
            </div>
            <div>
              <button type ='button' onClick= {e =>handleLoggout(e)}>Logg out</button>
            </div>

        </div>
    );

}
 
export default Profile;

