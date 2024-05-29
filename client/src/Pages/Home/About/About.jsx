import React from "react";
import { Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div>
      <Row xs={1} md={1}>
        <Col>
          <h1 className="font-montserrat pb-5">About Wirausaha Anak Ulbi</h1>
        </Col>
      </Row>
      <Row className="gx-6">
        <Col>
          <p className="font-cabin fs-default">
            Wirausaha Anak Ulbi adalah rumah bagi produk-produk berkualitas yang diciptakan oleh anak-anak muda berbakat. Kami percaya pada potensi anak muda dan berkomitmen untuk memberikan platform bagi mereka untuk berkembang dan
            bersinar.
          </p>
        </Col>
        <Col>
          <p className="font-cabin fs-default">Di Wirausaha Anak Ulbi, kami menawarkan berbagai produk unik dan inovatif yang dihasilkan oleh wirausahawan muda. Dukungan Anda membantu kami membangun masa depan yang lebih baik.</p>
        </Col>
      </Row>
    </div>
  );
};

export default About;
