import modules from "./ListInterns.module.css";

import { useContext } from "react";
import Context from "../../../context/Context";
import ListItemProjcets from "../ListItem/ListItemProjects";
function ListProjects() {
  const ctx = useContext(Context);

  const projects = ctx.projects;

  // if(ctx.isLoggedIn){
  //   console.log(interns) ;
  // }
  return (
    <>
      <div className={modules.list + " " + modules["table-container"]}>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">field</th>
              <th scope="col">duration</th>
              <th scope="col">max interns number</th>
              <th scope="col">supervisor</th>

              <th scope="col"> </th>
            </tr>
          </thead>
          {!ctx.errorProjects && !ctx.loadingProjects && (
            <tbody>
              {projects.map((val, index) => {
                return (
                  <ListItemProjcets
                    key={val.id}
                    name={val.name}
                    field={val.field}
                    duration={val.duration}
                    id={val.id}
                    internNumber={val.internNumber}
                    supervisor={val.supervisor}
                  ></ListItemProjcets>
                );
              })}
            </tbody>
          )}
        </table>
        {projects.length == 0 && !ctx.loadingProjects && (
          <p className="vide">there is no projects yet !!</p>
        )}
      </div>
      {ctx.loadingProjects && !ctx.errorProjects && (
        <p className={modules.text}>is loading ...</p>
      )}
      {ctx.errorProjects && <p className={modules.text}>there is a problem</p>}
    </>
  );
}

export default ListProjects;
