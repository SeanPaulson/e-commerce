import './settingsTab.scss';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ContextApp } from '../UserContext';
import PasswordForm from '../passwordForm/PasswordForm';
import EmailForm from '../emailForm/EmailForm';


export default function SettingsTab() {
    const { state } = useContext(ContextApp)

    return (
        <div className='cards'>
            <Card id='card--about'>
                <Card.Header>About You</Card.Header>
                <Card.Body>
                    <Card.Title>Name</Card.Title>
                    <Card.Text>{state.userProfile.first_name + " " + state.userProfile.last_name}</Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Connected Accounts</Card.Header>
                <Card.Body className='d-flex flex-column'>
                    <CardGroup className='gap-2'>
                        <Card.Img className='img__social' src='facebook.svg' />
                        <Card.Link href='#'>Facebook</Card.Link>
                    </CardGroup>
                    <CardGroup className='gap-2'>
                        <Card.Img className='img__social' src='google.svg' />
                        <Card.Link className='m-0' href='#'>Google</Card.Link>
                    </CardGroup>
                </Card.Body>
            </Card>
            <Card id='card--password'>
                <Card.Header>Change Password</Card.Header>
                <Card.Body>
                    <PasswordForm />
                </Card.Body>
            </Card>
            <Card id='card--password'>
                <Card.Header>Change Email</Card.Header>
                <Card.Body>
                    <EmailForm />
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Close Your Account</Card.Header>
                <Card.Body className='d-flex flex-column align-items-center'>
                    <Card.Title className='card--warning'>Warning!</Card.Title>
                    <Card.Text>This will permanently DELETE your account and all data associated with your account.
                        You will not be able to recover this account.
                    </Card.Text>
                    <Button className='rounded-pill' variant='dark'>Delete Account</Button>
                </Card.Body>
            </Card>
        </div>
    )
}