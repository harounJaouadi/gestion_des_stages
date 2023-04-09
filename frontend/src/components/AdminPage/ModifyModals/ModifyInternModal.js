import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./ModifyModal.module.css";

const ModifyInternModal = function ({ id, closeModifyModal }) {
  const ctx = useContext(Context);
  const interns = ctx.interns;
  const theIntern = interns.find((el) => el.id == id);  

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const projectRef = useRef();

  const close = function () {
    closeModifyModal();
  };
  async function modifyInternHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;
      
      let project = (ctx.projects.find((el)=>el.name==projectRef.current.value)) ;
        project=project && project.id ;   
      
      if(phone){
        if(phone.length!=8){
            alert("phone number invalid") ; 
            return ; 
          }
      }
      if(email){
        if(!email.includes('@') || !email.includes('.') || email.length<5){
            alert("email invalid") ; 
            return ;
          }
      }
      const emailFound=ctx.interns.find((el)=>(el.email==email)) ;
      if(emailFound){
        alert("email already exist , you must choose another email") ;
        return;
      }
      const obj={id:id} ; 
      if(name){
        obj.name=name ; 
      }
      if(email){
        obj.email=email ; 
      }
      if(phone){
        obj.phone=phone ; 
      }
      if(startDate){
        obj.startDate=startDate ; 
      }
      if(endDate){
        obj.endDate=endDate ; 
      }
      if(project){
        obj.project={id:id} ; 
      }
      
      const response = await fetch("http://127.0.0.1:8000/api/interns", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        alert("intern modified");
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
        <h2 className={modules.h2}>modify intern</h2>
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
              placeholder={theIntern.name}
            />
            <label
              htmlFor="exampleFormControlInput2"
              className={"form-label " + modules["text-modal"]}
            >
              Email address
            </label>
            <input
            ref={emailRef}
              placeholder={theIntern.email}
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
            />
            <label
              htmlFor="exampleFormControlInput4"
              className={"form-label " + modules["text-modal"]}
            >
              phone
            </label>
            <input
            ref={phoneRef}
              placeholder={theIntern.phone}
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
              start_date
            </label>
            <input
            ref={startDateRef}
              
              type="date"
              className="form-control"
              id="exampleFormControlInput3"
            />
            <label
              htmlFor="exampleFormControlInput5"
              className={"form-label " + modules["text-modal"]}
            >
              end_date
            </label>
            <input
            ref={endDateRef}
              
              type="date"
              className="form-control"
              id="exampleFormControlInput5"
            />
            <label
              htmlFor="exampleFormControlInput6"
              className={"form-label " + modules["text-modal"]}
            >
              project name
            </label>
            <select
              name="projects"
              className="form-control"
              id="exampleFormControlInput6"
              ref={projectRef}
            >
              <option value="">
                ----select a project ----
              </option>
              {ctx.projects.map((val, index) => {
                return (
                  <option key={index} value={val.name}>
                    {val.name}
                  </option>
                );
              })}
            </select>
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

export default ModifyInternModal;
