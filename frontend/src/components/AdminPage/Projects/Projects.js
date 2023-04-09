import { Fragment, useContext } from "react";
import Context from "../../../context/Context";

import ListProjects from "../List/ListProjects";
import modules from "./Projects.module.css";

const Projects = function () {
  const ctx = useContext(Context);
  return (
    <Fragment>
      <div>
        <h1 className={modules.title}>Welcome to Admin area</h1>
        <br></br>
        <br></br>
        <br></br>
        <div className="card">
          <div className={"card-body " + modules.add}>
            <h4 className={modules.h4}>you can add a project </h4>

            <button
              type="button"
              className="btn btn-dark"
              onClick={ctx.openProjectModal}
            >
              Add Project
            </button>
          </div>
        </div>
        <div className={"card "+modules["tip-card"]}>
          <div className={"card-body " + modules.add+" "+modules.tip}>
            <h4 >
              if you delete a project their interns will be deleated
            </h4>
          </div>
        </div>
        <br></br>
        {/* <div className={"p-3 mb-2 bg-light text-dark "+modules.add}>
            <h4>you can add an intern </h4>
            <button type="button" className="btn btn-dark">Add intern</button>
        </div> */}
      </div>
      <ListProjects></ListProjects>
    </Fragment>
  );
};

export default Projects;
