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
import { Link } from "react-router-dom";



const LoginOverlay = () => {

  const { state } = useContext(ContextApp);
  const [showOverLay, setShowOverLay] = useState(false);
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      show={showOverLay}
      overlay={
        <Popover id={"popover-positioned-bottom"}>
          <Popover.Header className="d-flex align-items-center column-gap-1 bg-light">
            {Object.keys(state.userProfile).length != 0 && <Link to="/settings">
              <Image
                className="profile-img"
                src="/person.svg"
                alt="profile"
                roundedCircle
              />
            </Link>}
            <span>
              <p style={{ margin: "0px" }}>
                {Object.keys(state.userProfile).length != 0 ? <b>{state.userProfile.first_name} {state.userProfile.last_name}</b> : 'login to'}
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
