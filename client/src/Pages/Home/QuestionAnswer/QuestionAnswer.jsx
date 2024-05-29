import React from "react";
import { Row, Col } from "react-bootstrap";

const QuestionAnswer = () => {
  return (
    <div>
      <Row className="pb-4" xs={1} md={1}>
        <Col>
          <h1 className="font-montserrat">Question and Answer</h1>
        </Col>
      </Row>
      <Row xs={1} md={1}>
        <Col>
          <p className="font-cabin fs-default">General</p>
        </Col>
        <hr />
        <Col>
          <Row xs={1} md={2}>
            <Col className='pb-4'>
              <div className="p-5 bg-color-light-grey font-cabin fs-description">
                <p className="text-danger fw-bold">1.Umum Lorem ipsum dolor sit amet consectetur adipiscing elit?</p>
                <p>Mattis, turpis vitae feugiat volutpat, neque mi vulputate mauris, eu ultrices arcu dui sit amet est. In ex eros.</p>
              </div>
            </Col>
            <Col className='pb-4'>
              <div className="p-5 bg-color-light-grey font-cabin fs-description">
                <p className="text-danger fw-bold">1.Umum Lorem ipsum dolor sit amet consectetur adipiscing elit?</p>
                <p>Mattis, turpis vitae feugiat volutpat, neque mi vulputate mauris, eu ultrices arcu dui sit amet est. In ex eros.</p>
              </div>
            </Col>
            <Col className='pb-4'>
              <div className="p-5 bg-color-light-grey font-cabin fs-description">
                <p className="text-danger fw-bold">1.Umum Lorem ipsum dolor sit amet consectetur adipiscing elit?</p>
                <p>Mattis, turpis vitae feugiat volutpat, neque mi vulputate mauris, eu ultrices arcu dui sit amet est. In ex eros.</p>
              </div>
            </Col>
            <Col className='pb-4'>
              <div className="p-5 bg-color-light-grey font-cabin fs-description">
                <p className="text-danger fw-bold">1.Umum Lorem ipsum dolor sit amet consectetur adipiscing elit?</p>
                <p>Mattis, turpis vitae feugiat volutpat, neque mi vulputate mauris, eu ultrices arcu dui sit amet est. In ex eros.</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionAnswer;
