import { Fragment } from "react";
import { Link } from "react-router-dom";
import modules from "./Welcome.module.css";

const Welcome = function () {
  return (
    <Fragment >
      <h1 className={modules["welcome-tag"]}>Welcome to Admin Area</h1>
      <h2 className={modules["welcome-tag"]}>
        you can access to interns ,supervisors or project
      </h2>

      <div className={"list-group "+modules.list}>
        <Link
          to="/interns"
          className={"list-group-item list-group-item-action " + modules.items}
          aria-current="true"
        >
          Interns
        </Link>
        <Link
          to="/projects"
          className={"list-group-item list-group-item-action " + modules.items}
        >
          Projects
        </Link>
        <Link
          to="/supervisors"
          className={"list-group-item list-group-item-action " + modules.items}
        >
          Supervisors
        </Link>
      </div>
    </Fragment>
  );
};

export default Welcome;
