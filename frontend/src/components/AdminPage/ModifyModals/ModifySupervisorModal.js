import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./ModifyModal.module.css";

const ModifySupervisorModal = function ({ id, closeModifyModal }) {
  const ctx = useContext(Context);
   

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const theSupervisor=ctx.supervisors.find((el)=>(el.id==id)) ; 
  
  const close = function () {
    closeModifyModal();
  };
  async function modifySupervisorHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      
      
         
      
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
      
      
      const response = await fetch("http://127.0.0.1:8000/api/supervisors", {
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
        <h2 className={modules.h2}>modify supervisor</h2>
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
              placeholder={theSupervisor.name}
            />
            <label
              htmlFor="exampleFormControlInput2"
              className={"form-label " + modules["text-modal"]}
            >
              Email address
            </label>
            <input
            ref={emailRef}
              placeholder={theSupervisor.email}
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
              placeholder={theSupervisor.phone}
              type="number"
              min="20000000"
              max="99999999"
              className="form-control"
              id="exampleFormControlInput4"
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
            <button type="submit" className={"btn btn-warning mb-3 "} onClick={modifySupervisorHandler}>
              Save Changes 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifySupervisorModal;