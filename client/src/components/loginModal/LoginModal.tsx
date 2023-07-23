import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../utils/fetchApi";

export type Inputs = {
  email: string;
  password: string;
  serverError: string;
};

const LoginModal = () => {
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
  // const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const logout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.status === 200) {
      console.log(res);
    }
  } catch(e) {
    console.log(e);
  }
}

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      clearErrors();
      const userData = await login(data);
      if (userData instanceof Error) {
        throw new Error(userData.message);
      }
      

    } catch (e: any) {
      setError("serverError", {
        type: "400",
        message: e.message,
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="light"
        className="d-flex gap-4 w-100 "
      >
        {/* <Image alt="logout" src="/box-arrow-left.svg" roundedCircle /> */}
        <p style={{ margin: "auto 0px" }}>login</p>
      </Button>
      
      <Button onClick={logout}>
              logout
            </Button>
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
              />
              {errors.serverError?.type === "400" && (
                <p style={{color: 'red'}}>{errors.serverError.message}</p>
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
