import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  //axios request to fetch data from database API
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    
    // const url = '/api/days';
    // axios.get(url).then(response => {
      // setDays([...response.data])
    })
  },[])

  //function to get remaining appointments spots
  function getRemainingSpots(newAppt) {
    return state.days.map((day, index) => {
      let openSpots = 0;
      for (let id of state.days[index].appointments) {
        if (newAppt[id].interview === null) {
          openSpots ++;
        }
      } 
      const remainingSpots = {...day, spots: openSpots}
      return remainingSpots;
    })
  }


  //axios request to insert interview data from Form into the state and database 
  function bookInterview(id, interview) {
 

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      setState(prev => ({...prev, appointments, days: getRemainingSpots(appointments)}))
})
    .catch(e => (console.log(e)))
  }

  ////axios request to delete interview data from state and database 
  function cancelInterview(id) {  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      setState(prev => ({...prev, appointments, days: getRemainingSpots(appointments)}))})
    .catch(e => (console.log(e)))
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}