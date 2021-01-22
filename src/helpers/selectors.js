import { useState } from "react";

//Gets all appointment ids that match a given day
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((eachDay) => eachDay.name === day);
  if (filteredDays.length === 0) {
    return [];
  }

  const appointments = filteredDays[0].appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  if (state.interviewers.id === interview.interviewer.id) {
    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      },
    };
  }
}