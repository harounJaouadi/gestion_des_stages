import { useContext } from "react";
import Context from "../../../context/Context";
import modules from "./ProjectsModal.module.css";

const ProjectsModal = function ({ id, closeProjectsModal }) {
    const ctx=useContext(Context) ;
  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={closeProjectsModal}></div>
      <div className={modules.content + " " + modules.centered}>
        
        <form>
          <div className="mb-3">
            
            <ul className="list-group">
                {(((ctx.supervisors).find((el)=>(el.id==id))).projects.length==0) && <h3 className="list-group-item">no projects found...</h3> 

                }
                {((ctx.supervisors).find((el)=>(el.id==id))).projects.map((el)=>(

                     <li className={"list-group-item "+modules["list-item"]} key={el.id}>{el.name}</li>
                ))}
            </ul>
          </div>

          <div className={"col-auto " + modules.submitt}>
            <button
              type="button"
              className={"btn btn-dark mb-3 " + modules.close}
              onClick={closeProjectsModal}
            >
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsModal;
