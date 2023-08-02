import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
type InputType = {
    confirmPassword: string
    currentPassword: string
    newPassword: string
}

export default function passwordForm() {

    const { register, handleSubmit } = useForm<InputType>();


    const onSubmit: SubmitHandler<InputType> = (data) => {
        console.log(data);
    }



    return (
        <Form onSubmit={handleSubmit(onSubmit)} className='w-50'>
            <Form.Group >
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                    size='sm'
                    {...register("currentPassword", { required: true })}
                    type='password'
                /><Form.Label>New Password</Form.Label>
                <Form.Control
                    size='sm'
                    {...register("newPassword", { required: true })}
                    type='password'
                /><Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    size='sm'
                    {...register("confirmPassword", { required: true })}
                    type='password'
                />
            </Form.Group>
            <Button className='rounded-pill my-2 w-100' variant='dark' type='submit' >submit</Button>
        </Form>
    )
}