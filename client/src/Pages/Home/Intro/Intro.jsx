import React from "react";
import { Row, Col } from "react-bootstrap";
import NavbarLogo from "./../../../assets/Image/WAU-removebg-preview.png"

const Intro = () => {
  return (
    <div>
      <Row xs={1} md={1}>
        <Col>
          <Row>
            <Col>
              <h2 className="font-montserrat fs-title pt-4 fw-bold pb-4">Wirausaha Anak Ulbi</h2>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="gx-6 font-cabin fs-default">
            <Col>Selamat datang di Wirausaha Anak Ulbi, tempat di mana kreativitas dan semangat anak muda bertemu dengan kualitas dan inovasi. Kami bangga mendukung generasi muda yang penuh semangat dan ide-ide brilian.</Col>
            <Col>
              <img src={NavbarLogo} alt=""/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Intro;
