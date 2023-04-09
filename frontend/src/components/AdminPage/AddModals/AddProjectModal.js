import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./AddModal.module.css";

function AddProjectModal() {
  const ctx = useContext(Context);
  const projects=ctx.projects ; 
  const nameRef = useRef();
  const fieldRef = useRef();
  const durationRef = useRef();
  const internNumberRef=useRef() ;
  

  async function addProjectHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const field = fieldRef.current.value;
      const duration = durationRef.current.value;
      const internNumber=internNumberRef.current.value
      
      if (name == "" || field == "" || duration == "") {
        alert("you must fill all input fields");
        return;
      }
      const nameFound=ctx.projects.find((el)=>(el.name==name)) ;
      console.log(nameFound!=undefined) ;
      if(nameFound){
        alert("project name already exist , you must choose another name") ;
        return;
      }
      
      const response = await fetch("http://127.0.0.1:8000/api/projects", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify({
          name: name,
          field :field , 
          duration : parseInt(duration) ,
          internNumber :parseInt(internNumber)
        }),
      });
      if (response.ok) {
        alert("project added");
        ctx.update() ;
        
      } else {
        alert("the request is invalid") ;
      }
    } catch (error) {
      alert("error");
    }
    ctx.closeProjectModal() ; 
  }

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={ctx.closeProjectModal}></div>
      <div className={modules.content + " " + modules.centered}>
        <h2 className={modules.h2}>add project</h2>
        <form>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className={"form-label " + modules["text-modal"]}
            >
              name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              ref={nameRef}
            />
            <label
              htmlFor="exampleFormControlInput2"
              className={"form-label " + modules["text-modal"]}
            >
              field
            </label>
            <input
              ref={fieldRef}
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
              type="number"
              min="1"
              max="10"
              className="form-control"
              id="exampleFormControlInput4"
            />
            <label
              htmlFor="exampleFormControlInput7"
              className={"form-label " + modules["text-modal"]}
            >
              number max of interns
            </label>
            <input
              ref={internNumberRef}
              type="number"
              min="1"
              max="10"
              className="form-control"
              id="exampleFormControlInput7"
            />
            
          </div>
          
          <div className={"col-auto " + modules.submitt}>
            <button
              type="button"
              onClick={ctx.closeProjectModal}
              className={"btn btn-dark mb-3 " + modules.close}
            >
              close
            </button>
            <button
              type="submit"
              onClick={addProjectHandler}
              className={"btn btn-warning mb-3 "}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProjectModal;