import { useContext, useState } from "react";
import Context from "../../../context/Context";
import ModifySupervisorModal from "../ModifyModals/ModifySupervisorModal";
import modules from "./ListItem.module.css";
import ReactDOM from "react-dom" ; 
import ProjectsModal from "../Supervisors/ProjectsModal";

function ListItemSupervisors({ name, email, phone, id }) {
  const [isShown, setIsShown] = useState(false);
  const [showProjects,setShowProjects]=useState(false) ;
  const showModifyModal = function () {
    setIsShown(true);
  };
  const closeModifyModal = function () {
    setIsShown(false);
  };
  const showProjectsModal = function () {
    setShowProjects(true);
  };
  const closeProjectsModal = function () {
    setShowProjects(false);
  };

  const ctx = useContext(Context);
  const remove = function () {
    ctx.removeSupervisor(id);
  };

  return (
    <>
    {isShown &&
        ReactDOM.createPortal(
          <ModifySupervisorModal id={id} closeModifyModal={closeModifyModal}></ModifySupervisorModal>,
          document.getElementById("modifyInternModal")
        )}
    {showProjects &&
        ReactDOM.createPortal(<ProjectsModal id={id} closeProjectsModal={closeProjectsModal}></ProjectsModal>
          ,
          document.getElementById("showProjectsModal")
        )}
    <tr>
      <th scope="row">{name}</th>

      <td>{email}</td>
      <td>{phone}</td>

      <td>
        <div className={modules.buttons}>

          <button
            type="button"
            className={"btn btn-outline-dark btn-sm " + modules["modify"]}
            onClick={showProjectsModal}
          >
            show Projects
          </button>
          <button
            type="button"
            className={"btn btn-outline-secondary btn-sm " + modules["modify"]}
            onClick={showModifyModal}
          >
            modify
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

export default ListItemSupervisors;
