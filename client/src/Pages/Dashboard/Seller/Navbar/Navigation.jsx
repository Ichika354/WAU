import React, { useState } from "react";
import Modal from "./ModalNavbar";

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <nav className="navbar-seller">
        <div className="navbar-logo">Your Logo</div>
        <div className="navbar-menu">
          <div className="navbar-item" onClick={toggleModal}>
            <i className="fas fa-user"></i>
          </div>
        </div>
        {showModal && <Modal onClose={toggleModal} />}
      </nav>
    </div>
  );
};

export default Navigation;
