import modules from "./ListInterns.module.css";

import { useContext, useState } from "react";
import Context from "../../../context/Context";
import ListItemInterns from "../ListItem/ListItemInterns";
function ListInterns() {
  const ctx = useContext(Context);

  const interns = ctx.interns;
  return (
    <>
      <div className={modules.list + " " + modules["table-container"]}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">Email</th>
              <th scope="col">phone</th>
              <th scope="col">supervisor</th>
              <th scope="col">Project</th>

              <th scope="col"> </th>
            </tr>
          </thead>
          {!ctx.error && !ctx.loadingInterns && (
            <tbody>
              {interns.map((val, index) => {
                return (
                  <ListItemInterns
                    key={val.id}
                    id={val.id}
                    name={val.name}
                    email={val.email}
                    phone={val.phone}
                    supervisor={
                      val.Project.supervisor
                        ? val.Project.supervisor.name
                        : "has no supervisor"
                    }
                    project={val.Project.name}
                  ></ListItemInterns>
                );
              })}
            </tbody>
          )}
        </table>
        {interns.length == 0 && !ctx.loadingInterns && (
          <p className="vide">there is no interns yet !!</p>
        )}
      </div>
      {ctx.loadingInterns && !ctx.errorInterns && (
        <p className={modules.text}>is loading ...</p>
      )}
      {ctx.errorInterns && <p className={modules.text}>there is a problem</p>}
    </>
  );
}

export default ListInterns;
