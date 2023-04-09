import { useContext } from "react";
import Context from "../../../context/Context";
import modules from "./ShowMore.module.css";
const ShowMore = function ({ closeMoreModal, id }) {
  const ctx = useContext(Context);
  const intern = ctx.interns.find((el) => el.id == id);

  return (
    <div className={modules.modal}>
      <div className={modules.darkBG} onClick={closeMoreModal}></div>
      <div className={modules.content + " " + modules.centered}>
        <form>
          <div className="mb-3">
            <ul className="list-group">
              <div className={"form-label " + modules["text-modal"]}>
                start date
              </div>
              <li className="list-group-item">{intern.startDate}</li>
              <div className={"form-label " + modules["text-modal"]}>
                end date
              </div>
              <li className="list-group-item">{intern.endDate}</li>
            </ul>
          </div>

          <div className={"col-auto " + modules.submitt}>
            <button
              type="button"
              className={"btn btn-dark mb-3 " + modules.close}
              onClick={closeMoreModal}
            >
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowMore;
