import { useContext, useState } from "react";
import Context from "../../../context/Context";
import ModifyInternModal from "../ModifyModals/ModifyInternModal";
import modules from "./ListItem.module.css";
import ReactDOM from "react-dom";
import ShowMore from "../Interns/ShowMore";

function ListItemInterns({ name, email, phone, supervisor, project, id }) {
  const [isShown, setIsShown] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const showModifyModal = function () {
    setIsShown(true);
  };
  const closeModifyModal = function () {
    setIsShown(false);
  };
  const showMoreModal = function () {
    setShowMore(true);
  };
  const closeMoreModal = function () {
    setShowMore(false);
  };

  const ctx = useContext(Context);
  const remove = () => {
    ctx.removeIntern(id);
  };

  return (
    <>
      {isShown &&
        ReactDOM.createPortal(
          <ModifyInternModal
            closeModifyModal={closeModifyModal}
            id={id}
          ></ModifyInternModal>,
          document.getElementById("modifyInternModal")
        )}
      {showMore &&
        ReactDOM.createPortal(
          <ShowMore id={id} closeMoreModal={closeMoreModal}></ShowMore>,
          document.getElementById("showMoreModal")
        )}
      <tr>
        <th scope="row">{name}</th>

        <td>{email}</td>
        <td>{phone}</td>
        <td>{supervisor}</td>
        <td>{project}</td>
        <td>
          <div className={modules.buttons}>
            <button
              type="button"
              onClick={showMoreModal}
              className={
                "btn btn-outline-secondary btn-sm " + modules["modify"]
              }
            >
              more...
            </button>
            <button
              type="button"
              className={
                "btn btn-outline-secondary btn-sm " + modules["modify"]
              }
              onClick={showModifyModal}
            >
              modify
            </button>
            <button
              type="button"
              className={"btn btn-outline-danger " + modules["remove"]}
              onClick={remove}
            >
              remove
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ListItemInterns;
