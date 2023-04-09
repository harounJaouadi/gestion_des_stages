import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./ModifyModal.module.css";

const ModifyProjectModal = function ({ id, closeModifyModal }) {
  const ctx = useContext(Context);
  const projects = ctx.projects;
  const theProject = projects.find((el) => el.id == id);  

  const nameRef = useRef();
  const fieldRef=useRef() ;
  const durationRef = useRef();
  const internNumberRef = useRef();

  const close = function () {
    closeModifyModal();
  };
  async function modifyInternHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const duration = durationRef.current.value;
      const internNumber = internNumberRef.current.value;
      const field = fieldRef.current.value;
      
      
      
      
      const obj={id:id} ; 
      if(name){
        obj.name=name ; 
      }
      if(duration){
        obj.duration=duration ; 
      }
      if(internNumber){
        obj.internNumber=internNumber ; 
      }
      if(field){
        obj.field=field ; 
      }
      
      if(!field && !duration && !internNumber && !name){
        alert("all field are impty") ;
        return ;
      }
      const response = await fetch("http://127.0.0.1:8000/api/projects", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        alert("project modified");
        ctx.update() ;
        
      } else {
        alert("the request is invalid") ;
      }
    } catch (error) {
      alert(error.message);
    }
    close();
  }

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={close}></div>
      <div className={modules.content + " " + modules.centered}>
        <h2 className={modules.h2}>modify project</h2>
        <form>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className={"form-label " + modules["text-modal"]}
            >
              name
            </label>
            <input
                ref={nameRef}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder={theProject.name}
            />
            <label
              htmlFor="exampleFormControlInput2"
              className={"form-label " + modules["text-modal"]}
            >
              field
            </label>
            <input
            ref={fieldRef}
              placeholder={theProject.field}
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
            />
            <label
              htmlFor="exampleFormControlInput4"
              className={"form-label " + modules["text-modal"]}
            >
              duration
            </label>
            <input
            ref={durationRef}
              placeholder={theProject.duration}
              type="number"
              min="20000000"
              max="99999999"
              className="form-control"
              id="exampleFormControlInput4"
            />
            <label
              htmlFor="exampleFormControlInput3"
              className={"form-label " + modules["text-modal"]}
            >
              internNumber
            </label>
            <input
            ref={internNumberRef}
              placeholder={theProject.internNumber}
              type="text"
              className="form-control"
              id="exampleFormControlInput3"
            />
            
            
          </div>

          <div className={"col-auto " + modules.submitt}>
            <button
              type="button"
              className={"btn btn-dark mb-3 " + modules.close}
              onClick={close}
            >
              close
            </button>
            <button type="submit" className={"btn btn-warning mb-3 "} onClick={modifyInternHandler}>
              Save Changes 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyProjectModal;