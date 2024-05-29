import { Row, Col } from "react-bootstrap";
import BookImage from "./../../../assets/Image/book.jpeg"

const ProductExample = () => {
  return (
    <div>
      <Row xs={1} md={1}>
        <Col>
          <h1 className="font-montserrat pb-5">Product Example</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={4}>
          <img src={BookImage} alt="Book" width='200' />
        </Col>
        <Col xs={12} md={8}>
          <h2 className="font-cabin">Product Name</h2>
          <p className="font-cabin fs-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ornare, nunc id cursus ultrices, purus sapien ultricies enim, vel
            fermentum turpis ligula sit amet purus. Nulla facilisi. Nullam
            ornare, nunc id cursus ultrices, purus sapien ultricies enim, vel
            fermentum turpis ligula sit amet purus. Nulla facilisi.
          </p>
          <h3 className="font-cabin fs-default">Price: Rp. 100.000</h3>
        </Col>
      </Row>
    </div>
  );
};

export default ProductExample;
