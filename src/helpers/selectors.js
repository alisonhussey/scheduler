import { useState } from 'react';


export function getAppointmentsForDay(state, day) {
  
  const filteredDays = state.days.filter(eachDay => eachDay.name === day)
  if (filteredDays.length === 0) {
    return [];
  }

  const appointments = filteredDays[0].appointments.map(appointmentId => state.appointments[appointmentId])
  return appointments
}
   