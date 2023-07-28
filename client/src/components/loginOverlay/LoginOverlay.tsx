import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";
import Image from "react-bootstrap/esm/Image";
import "./_LoginOverlay.scss";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import LoginModal from '../loginModal/LoginModal';
import { useContext, useState } from "react";
import { ContextApp } from "../ContextProvider";
const LoginOverlay = () => {

  const {state} = useContext(ContextApp);
  const [showOverLay, setShowOverLay] = useState(false);
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={showOverLay}
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
                <b>{ Object.keys(state.userProfile).length != 0 ? state.userProfile.firstName + " " + state.userProfile.lastName : 'userName'}</b>
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
          <LoginModal handleOverlay={setShowOverLay}></LoginModal>
        </Popover>
      }
    >
      <Button className="popover__btn" variant="light" onClick={() => setShowOverLay((prev) => !prev)}>
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
