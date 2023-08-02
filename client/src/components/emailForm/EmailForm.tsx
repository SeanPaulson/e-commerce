import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
type emailType = {

    newEmail: string
    confirmEmail: string
}

export default function EmailForm() {

    const { register, handleSubmit } = useForm<emailType>();


    const onSubmitEmail: SubmitHandler<emailType> = (data) => {
        console.log(data);
    }



    return (
        <Form onSubmit={handleSubmit(onSubmitEmail)} className='w-50'>
            <Form.Group >
                <Form.Label>New Email</Form.Label>
                <Form.Control size='sm'
                    {...register("newEmail", { required: true })}
                    type='email'
                /><Form.Label>Confirm Email</Form.Label>
                <Form.Control
                    size='sm'
                    {...register("confirmEmail", { required: true })}
                    type='email'
                />
            </Form.Group>
            <Button size='sm' className='rounded-pill my-2 w-100' variant='dark' type='submit' >submit</Button>
        </Form>
    )
}