import { useContext, useState } from "react";
import Context from "../../../context/Context";
import ModifyProjectModal from "../ModifyModals/ModifyProjectModal";
import modules from "./ListItem.module.css";
import ReactDOM from "react-dom";
import SetSupervisorModal from "../Projects/SetSupervisorModal";

function ListItemProjcets({ name, field, duration, id, internNumber ,supervisor }) {
  const [isShown, setIsShown] = useState(false);
  const [supervisorModShown, setSupervisorModShown] = useState(false);

  const showModifyModal = function () {
    setIsShown(true);
  };
  const closeModifyModal = function () {
    setIsShown(false);
  };
  const showSetSup = function () {
    setSupervisorModShown(true);
  };
  const closeSetSup = function () {
    setSupervisorModShown(false);
  };

  const ctx = useContext(Context);
  const remove = function () {
    ctx.removeProject(id);
  };
  return (
    <>
      {supervisorModShown &&
        ReactDOM.createPortal(
          <SetSupervisorModal  closeSetSup={closeSetSup} id={id}></SetSupervisorModal>,
          document.getElementById("setSupervisorModal")
        )}
      {isShown &&
        ReactDOM.createPortal(
          <ModifyProjectModal
            closeModifyModal={closeModifyModal}
            id={id}
          ></ModifyProjectModal>,
          document.getElementById("modifyProjectModal")
        )}
      <tr>
        <th scope="row">{name}</th>

        <td>{field}</td>
        <td>{duration}</td>
        <td>{internNumber}</td>
        <td>{supervisor? supervisor.name :"NO SUPERVISOR"}</td>

        <td>
          <div className={modules.buttons}>
            <button
              type="button"
              className={
                "btn btn-outline-secondary btn-sm " + modules["modify"]
              }
              onClick={showModifyModal}
            >
              modify
            </button>
            <button
              type="button"
              onClick={showSetSup}
              className={"btn btn-outline-dark " + modules["remove"]}
            >
              set Supervisor
            </button>
            <button
              onClick={remove}
              type="button"
              className={"btn btn-outline-danger " + modules["remove"]}
            >
              remove
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ListItemProjcets;
