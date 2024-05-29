import React from "react";

const ModalNavbar = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <ul className="modal-menu">
          <li className="modal-item">Settings</li>
          <li className="modal-item">Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalNavbar;
