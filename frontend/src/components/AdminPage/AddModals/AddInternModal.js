import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./AddModal.module.css";

function AddInternModal() {
  const ctx = useContext(Context);
  const projects = ctx.projects;
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const commentRef = useRef();
  const projectRef = useRef();

  async function addInternHandler(event) {
    event.preventDefault();
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const phone = phoneRef.current.value;
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;
      const comment = commentRef.current.value;
      const project = projectRef.current.value;
      if (name == "" || email == "" || phone == "" || startDate == ""
      || endDate == "" || project == "") {
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
      const emailFound=ctx.interns.find((el)=>(el.email==email)) ;
      if(emailFound){
        alert("email already exist , you must choose another email") ;
        return;
      }
      
      const response = await fetch("http://127.0.0.1:8000/api/interns", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          startDate: startDate,
          endDate: endDate,
          comments: comment,
          project: {
            name: project,
          },
        }),
      });
      if (response.ok) {
        alert("intern added");
        ctx.update() ;
        
      } else {
        alert("the request is invalid") ;
      }
    } catch (error) {
      alert(error.message);
    }
    ctx.closeInternModal();
  }

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={ctx.closeInternModal}></div>
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
              <option value="">--Please choose a project--</option>
              {projects.map((val, index) => {
                return <option key={index} value={val.name}>{val.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className={"form-label " + modules["text-modal"]}
            >
              you can add comments
            </label>
            <textarea
              ref={commentRef}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className={"col-auto " + modules.submitt}>
            <button
              type="button"
              onClick={ctx.closeInternModal}
              className={"btn btn-dark mb-3 " + modules.close}
            >
              close
            </button>
            <button
              type="submit"
              onClick={addInternHandler}
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

export default AddInternModal;
