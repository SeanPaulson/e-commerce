import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { UserProfileType } from "../../utils/types";

type IProps<T> = {
  defaultValues: T;
  action: (data: Partial<UserProfileType>) => Promise<UserProfileType | undefined>,
  formBtnText?: string;
  cb?: (data: Partial<UserProfileType>) => void

}

// const serverError: IProps<IPropsSignature>['defaultValues'] = {serverError: ''}

type IPropsSignature = {
  [index: string]: string | number | Date
}


const ModelFrom = ({ defaultValues, formBtnText, action, cb }: IProps<IPropsSignature>) => {

  defaultValues.serverError;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); clearErrors() }
  const handleShow = () => setShow(true);



  const onSubmit = async (data: typeof defaultValues) => {
    try {
      clearErrors();

      const res = await action(data);
      if (res instanceof Error) {
        throw new Error(res.message);
      } else if (res) {
        if (cb) {
          cb(data)
        }
        reset();
        handleClose();
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
      <Button variant='dark' className="rounded-pill w-25" onClick={handleShow}>{formBtnText ?? 'open'}</Button>
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
              Object.keys(defaultValues).map((value, index) => {
                if (value !== 'serverError') {
                  return <Form.Group key={index} className="mb-3" controlId="formBasicEmail">
                    <Form.Label key={index + 5}>{value}</Form.Label>
                    <Form.Control
                      key={index}
                      placeholder={`${defaultValues[value]}`}
                      {...register(`${value}`, {
                        required: true,
                        valueAsDate: value === 'Expiration' ? true : false
                      })}
                      onChange={() => clearErrors('serverError')}
                    />
                  </Form.Group>
                }
              })
            }


            <p style={{ color: 'red' }} >{errors.serverError?.message}</p>
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
