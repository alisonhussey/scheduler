import React from "react";
import "./styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //saves Form input into interview object in database, then transistions components
  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props
    .bookInterview(props.id, interview)
    .then(() =>transition(SHOW))
  };

  function deletion() {
    transition(DELETING)
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  function confirm() {
    transition(CONFIRM)  
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        />
      )} 
      {mode === CREATE && (<Form 
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        onSave={save}/>
      )}
      {mode === SAVING && <Status message= "Saving"/>}
      {mode === DELETING && <Status message= "Deleting"/>}
      {mode === CONFIRM && <Confirm
        message="Are you sure you want to delete?"
        onCancel={() => back(SHOW)}
        onConfirm={deletion}

      />}
    </article>
  )
}