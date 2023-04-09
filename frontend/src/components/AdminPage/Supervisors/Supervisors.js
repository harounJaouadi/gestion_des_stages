import { Fragment, useContext } from "react";
import Context from "../../../context/Context";
import ListSupervisors from "../List/ListSupervisors";


import modules from "./Supervisors.module.css" ; 

const Supervisors = function () {
  const ctx=useContext(Context) ;
  return (
    <Fragment>
      <div>
        <h1 className={modules.title}>Welcome to Admin area</h1>
        <br></br>
        <br></br>
        <br></br>
        <div className="card">
          <div className={"card-body " + modules.add}>
            <h4 className={modules.h4}>you can add a supervisor </h4>
            <button type="button" className="btn btn-dark" onClick={ctx.openSupervisorModal}>
              Add supervisor
            </button>
          </div>
        </div>
        <br></br>
        {/* <div className={"p-3 mb-2 bg-light text-dark "+modules.add}>
            <h4>you can add an intern </h4>
            <button type="button" className="btn btn-dark">Add intern</button>
        </div> */}
      </div>
      <ListSupervisors></ListSupervisors>
    </Fragment>
  );
};

export default Supervisors;
