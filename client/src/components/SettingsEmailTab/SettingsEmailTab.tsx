import { useContext } from 'react';
import './_SettingsEmailTab.modules.scss';
import Card from 'react-bootstrap/esm/Card';
import { ContextApp } from '../UserContext';
import { Button } from 'react-bootstrap';
import ModelForm from '../ModalForm/ModelForm';
import { updateUserProfile } from '../../utils/fetchApi';

const EMAILFORMDEFAULTVALUES = {
    email: '',
}


export default function SettingsEmailTab() {

    const { state } = useContext(ContextApp);

    return (
        <>
            {
                state.userProfile.email_address ?
                    <Card>
                        <Card.Header>Email</Card.Header>
                        <Card.Body>
                            <Card.Title>Email</Card.Title>
                            <Card.Text>{state.userProfile.email_address}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ModelForm defaultValues={EMAILFORMDEFAULTVALUES} action={({ }) => new Promise(() => { throw new Error('Sorry but you cannot edit guest email') })} formBtnText='edit' />
                            <Button variant='light' className='rounded-pill bg-white'>Remove</Button>
                        </Card.Footer>
                    </Card>
                    :
                    <div>
                        <p>Add Email Information</p>
                        <ModelForm defaultValues={EMAILFORMDEFAULTVALUES} action={updateUserProfile} formBtnText='add' />
                    </div>
            }
        </>
    )
}