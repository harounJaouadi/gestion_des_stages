import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./AddModal.module.css";

function AddSupervisorModal() {
  const ctx = useContext(Context);
  
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  

  async function addSupervisorHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      
      if (name == "" || email == "" || phone == "") {
        alert("you must fill all input fields");
        return;
      }
      if(phone.length!=8){
        alert("phone number invalid") ; 
        return ; 
      }
      if(!email.includes('@') || !email.includes('.') || email.length<5){
        alert("email invalid") ; 
        return ;
      }
      const emailFound=ctx.supervisors.find((el)=>(el.email==email)) ;
      if(emailFound){
        alert("email already exist , you must choose another email") ;
        return;
      }
      const response = await fetch("http://127.0.0.1:8000/api/supervisors", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone
        }),
      });
      if (response.ok) {
        alert("supervisor added");
        ctx.update() ;
        
      } else {
        console.log("the request is invalid");
      }
    } catch (error) {
      alert("error");
    }
    ctx.closeSupervisorModal();
  }

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={ctx.closeSupervisorModal}></div>
      <div className={modules.content + " " + modules.centered}>
        <h2 className={modules.h2}>add intern</h2>
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
              Email address
            </label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="name@example.com"
            />
            <label
              htmlFor="exampleFormControlInput4"
              className={"form-label " + modules["text-modal"]}
            >
              phone
            </label>
            <input
              ref={phoneRef}
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
              onClick={ctx.closeSupervisorModal}
              className={"btn btn-dark mb-3 " + modules.close}
            >
              close
            </button>
            <button
              type="submit"
              onClick={addSupervisorHandler}
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

export default AddSupervisorModal;
