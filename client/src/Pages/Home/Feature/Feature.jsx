import React from "react";
import { Row, Col } from "react-bootstrap";

const Feature = () => {
  return (
    <div>
      <Row xs={1} md={2}>
        <Col>
          <h1 className="font-montserrat">Benefit of WAU</h1>
        </Col>
      </Row>
      <Row className="pt-5 gx-6">
        <Col>
          <Row xs={1} md={1}>
            <Col className="pb-3">
              <i className="fa-solid fa-bolt fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Fast Registration </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
            <Col className="pb-3">
              <i className="fa-solid fa-money-bill fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Cheap Price </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
            <Col className="pb-3">
              <i className="fa-solid fa-circle-info fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Detailed Information </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row xs={1} md={1}>
            <Col className="pb-3">
              <i className="fa-solid fa-user-group fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Friendly Service </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
            <Col className="pb-3">
              <i className="fa-solid fa-calendar-days fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Flexible Options </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
            <Col className="pb-3">
              <i className="fa-solid fa-bank fs-icon"></i>
              <p className="font-cabin fs-default">
                <span className="fw-bold">Multiple Payment Methods </span>: Lorem ipsum dolor sit, amet consectetur
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Feature;
