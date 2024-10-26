import React from "react";
import "./styles.css";
import AddGame from "../../Views/AddGame/AddGame";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <AddGame onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
