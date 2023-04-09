import { Fragment, useContext } from "react";
import Context from "../../../context/Context";
import ListInterns from "../List/ListInterns";
import modules from "./Interns.module.css" ; 

const Interns = function () {
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
            <h4 className={modules.h4}>you can add an intern </h4>
            <button type="button" className="btn btn-dark" onClick={ctx.openInternModal}>
              Add intern
            </button>
          </div>
        </div>
        <br></br>
        {/* <div className={"p-3 mb-2 bg-light text-dark "+modules.add}>
            <h4>you can add an intern </h4>
            <button type="button" className="btn btn-dark">Add intern</button>
        </div> */}
      </div>
      <ListInterns></ListInterns>
    </Fragment>
  );
};

export default Interns;
