import modules from "./ListInterns.module.css";

import { useContext, useState } from "react";
import Context from "../../../context/Context";
import ListItemSupervisors from "../ListItem/ListItemSupervisors";
function ListSupervisors() {
  const ctx = useContext(Context);

  const supervisors = ctx.supervisors;

  // if(ctx.isLoggedIn){
  //   console.log(interns) ;
  // }
  return (
    <>
      <div className={modules.list + " " + modules["table-container"]}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>

              <th scope="col"> </th>
            </tr>
          </thead>
          {!ctx.errorSupervisors && !ctx.loadingSupervisors && (
            <tbody>
              {supervisors.map((val, index) => {
                return (
                  <ListItemSupervisors
                    key={val.id}
                    name={val.name}
                    email={val.email}
                    phone={val.phone}
                    id={val.id}
                  ></ListItemSupervisors>
                );
              })}
            </tbody>
          )}
        </table>
        {supervisors.length == 0 && !ctx.loadingSupervisors && (
          <p className="vide">there is no supervisors yet !!</p>
        )}
      </div>
      {ctx.loadingSupervisors && !ctx.errorSupervisors && (
        <p className={modules.text}>is loading ...</p>
      )}
      {ctx.errorSupervisors && (
        <p className={modules.text}>there is a problem</p>
      )}
    </>
  );
}

export default ListSupervisors;
