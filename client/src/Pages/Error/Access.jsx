import React from "react";
import "./../../assets/Style/Access.css";


const Access = () => {
  return (
    <div>
      <div className="center">
        <div className="error">
          <div className="number">4</div>
          <div className="illustration">
            <div className="circle"></div>
            <div className="clip">
              <div className="paper">
                <div className="face">
                  <div className="eyes">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                  </div>
                  <div className="rosyCheeks rosyCheeks-left"></div>
                  <div className="rosyCheeks rosyCheeks-right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="number">4</div>
        </div>

        <div className="text">Oops. You do not have cookies to open this page</div>
        <button className="button" href="#">
          Back Home
        </button>
      </div>
    </div>
  );
};

export default Access;
