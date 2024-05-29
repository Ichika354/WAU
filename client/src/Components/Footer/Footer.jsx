import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Row className="gx-5">
        <Col xs={1} md={4}>
          <div className="col-md-4 pb-4">
            <img src="" alt="" height="110" />
          </div>
        </Col>
        <Col xs={1} md={8}>
          <p className="w-100 font-cabin fs-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta omnis officia hic quos quibusdam libero optio vero unde et, explicabo qui pariatur tempora sint delectus reprehenderit iure blanditiis maxime possimus odio iste
            doloremque inventore earum deleniti. Molestiae explicabo nemo.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
