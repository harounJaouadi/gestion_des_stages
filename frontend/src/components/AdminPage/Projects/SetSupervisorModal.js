import { useContext, useRef } from "react";
import Context from "../../../context/Context";
import modules from "./setSupervisorModal.module.css";

const SetSupervisorModal = function ({ closeSetSup ,id}) {
  const supervisorRef = useRef();
  const ctx = useContext(Context);
  const close = function () {
    closeSetSup();
  };

  async function setSupervisor(event) {
    event.preventDefault();
    try {
        const supervisor=ctx.supervisors.find((el)=>(el.name==supervisorRef.current.value)) ;
        if(!supervisor){
            alert("nothing change") ;
            return ;
        }
      const response = await fetch("http://127.0.0.1:8000/api/project/setSupervisor", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ctx.token}`,
        },
        body: JSON.stringify({
            id : id , 
            supervisor : {
                id : supervisor.id
            }
        }),
      });
      if (response.ok) {
        alert("supervisor is set ");
        ctx.update();
      } else {
        alert("the request is invalid");
      } ;
      closeSetSup() ;
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={close}></div>
      <div className={modules.content + " " + modules.centered}>
        <h2 className={modules.h2}>set supervisor</h2>
        <form>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className={"form-label " + modules["text-modal"]}
            >
              supervisor
            </label>
            <select
              name="projects"
              className="form-control"
              id="exampleFormControlInput1"
              ref={supervisorRef}
            >
              <option value="">----select a supervisor ----</option>
              {ctx.supervisors.map((val, index) => {
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
              onClick={close}
              className={"btn btn-dark mb-3 " + modules.close}
            >
              close
            </button>
            <button type="submit" className={"btn btn-warning mb-3 "} onClick={setSupervisor}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SetSupervisorModal;
