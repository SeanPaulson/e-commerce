import { useState, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { login, logout } from "../../utils/fetchApi";
import { ContextApp } from "../UserContext";
import { ACTION_TYPES } from "../../reducers/profileReducer";
import { redirect } from "react-router";

export type Inputs = {
  email: string;
  password: string;
  serverError: string;
};

type handleOverlayType = { handleOverlay: React.Dispatch<React.SetStateAction<boolean>> }


const LoginModal = ({ handleOverlay }: handleOverlayType) => {
  const { state, dispatch } = useContext(ContextApp);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "guest@guest.com",
      password: "lsajf03fhwojf",
    },
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleLogout = async () => {
    const res = await logout();
    if (res && res.status === 200) {
      dispatch({ type: ACTION_TYPES.LOGOUT, payload: {} })
      handleOverlay(false);
      redirect('/')
    } else if (res instanceof Error) {
      setError("serverError", {
        type: "400",
        message: res.message,
      });
    }
  };


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      clearErrors();
      const res = await login(data);
      if (res instanceof Error) {
        throw new Error(res.message);
      } else {
        dispatch({ type: ACTION_TYPES.LOGIN, payload: res.userData });
        handleClose();
        handleOverlay(false);
      }



    } catch (e: any) {
      setError("serverError", {
        type: "400",
        message: e.message,
      });
    }
  };

  return (

    <>{console.log('render loginModel')}
      {Object.keys(state.userProfile).length != 0 ? (
        <Button variant="light" onClick={handleLogout}>
          logout
        </Button>
      ) : (
        <Button variant="light" onClick={handleShow} className="d-flex gap-4 w-100 ">
          <p style={{ margin: "auto 0px" }}>login</p>
        </Button>
      )}
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <p style={{ color: "red" }}>{errors.email?.message}</p>
              <Form.Control
                {...register("email", { required: "email required" })}
                type="email"
                placeholder="Enter email"
                onChange={() => clearErrors(['email', 'serverError'])}
              />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <p style={{ color: "red" }}>{errors.password?.message}</p>
              <Form.Control
                {...register("password", {
                  required: "is required",
                  minLength: 4,
                })}
                type="password"
                placeholder="Password"
                onChange={() => clearErrors(['password', 'serverError'])}
              />
              {errors.serverError?.type === "400" && (
                <p style={{ color: "red" }}>{errors.serverError.message}</p>
              )}
            </Form.Group>
            <Button className="rounded-pill " variant="primary" type="submit">
              <b>Submit</b>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
