import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";
import Image from "react-bootstrap/esm/Image";
import "./_LoginOverlay.scss";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";

const LoginOverlay = () => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover id={"popover-positioned-bottom"}>
          <Popover.Header className="d-flex align-items-center column-gap-1 bg-light">
            <Image
              className="profile-img"
              src="/person.svg"
              alt="profile"
              roundedCircle
            />
            <span>
              <p style={{ margin: "0px" }}>
                <b>Name</b>
              </p>
              <p style={{ margin: "0px", fontSize: ".7rem" }}>
                <i>view your profile</i>
              </p>
            </span>
          </Popover.Header>
          <Popover.Body className="d-flex">
            <Container>
              <Col>
                <strong>Holy guacamole!</strong>
              </Col>
              <Col>Check this info.info</Col>
            </Container>
          </Popover.Body>
          <div className="d-flex">
            <Button variant="light" className="rounded-circle r-100" >
              <Image alt="logout" src="/box-arrow-left.svg" roundedCircle />
            </Button>
            <p style={{margin: 'auto 0px'}}>logout</p>
          </div>
        </Popover>
      }
    >
      <Button className="popover__btn" variant="light">
        <Image
          className="profile-img"
          src="/person.svg"
          alt="profile"
          roundedCircle
        ></Image>
      </Button>
    </OverlayTrigger>
  );
};

export default LoginOverlay;
