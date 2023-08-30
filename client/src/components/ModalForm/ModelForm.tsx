import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

type IProps<T> = {
  defaultValues: T;
  action: (data: T) => Promise<void>,
  formBtnText?: string;
}


type IPropsSignature = {
  [index: string]: string | number | Date
}


const ModelFrom = ({ defaultValues, formBtnText, action }: IProps<IPropsSignature>) => {

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const onSubmit = async (data: typeof defaultValues) => {
    try {
      clearErrors();
      console.log(data);
      await action(data);
      reset();
      handleClose();

    } catch (e: any) {
      // setError("serverError", {
      //   type: "400",
      //   message: e.message,
      // });
    }
  };

  return (

    <>
      <Button onClick={handleShow}>{formBtnText ?? 'open'}</Button>
      <Modal
        backdrop='static'
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

            {
              Object.keys(defaultValues).map((value, index) => (
                <Form.Group key={index} className="mb-3" controlId="formBasicEmail">
                  <Form.Label key={index + 5}>{value}</Form.Label>
                  <Form.Control
                    key={index}
                    placeholder={`${defaultValues[value]}`}
                    {...register(`${value}`, {
                      required: true,
                      valueAsDate: value === 'Expiration' ? true : false
                    })}
                  />
                </Form.Group>
              ))
            }


            <Button className="rounded-pill " variant="primary" type="submit">
              <b>Submit</b>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModelFrom;
