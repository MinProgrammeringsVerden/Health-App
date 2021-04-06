/*const fetchingApp =  async () =>{
    console.log('I was clicked , get all appointments')

    appointmentDispatch({ type:USER_APPOINTMENT_REQUEST })
      try{
     const {data} = await axios.get("http://localhost:5000/users/:id");
     console.log('fetching appointments');
     appointmentDispatch({ type:USER_APPOINTMENT_SUCCESS , payload:data })
     console.log('datatatatatat' , data)
     setAppointments(data);
     console.log('setAppointments ' ,setAppointments );
   //  console.log('APPOINTMENTDISPATCH!!!! ' , {loading , userappointments ,error})
     

    }catch(error){
        appointmentDispatch({ type:USER_APPOINTMENT_FAIL , payload:error.message })
      }
};

doctorlistDispatch({ type:DOCTOR_LIST_REQUEST })
try{
const {data} = await axios.get("http://localhost:5000/doctors");
console.log('doctorList' , {data});
doctorlistDispatch({ type:DOCTOR_LIST_SUCCESS, payload:data});
setDoctorList(data)

}catch(error){
doctorlistDispatch({ type:DOCTOR_LIST_FAIL, payload:error.message });
}
}) ;
*/