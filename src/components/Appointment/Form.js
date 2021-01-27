import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//Form component for mode when a user wants to create or edit an appointment
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //resets student name and interviewer in form
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  //cancels appointment
  const cancel = function () {
    reset();
    props.onCancel();
  };

  //saves appointment only if student name is not blank
  function validate() {
    
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("You must select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
