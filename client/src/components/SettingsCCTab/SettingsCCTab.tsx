import { useContext } from 'react';
import './_settingsCCTab.modules.scss';
import Card from 'react-bootstrap/esm/Card';
import { ContextApp } from '../UserContext';
import { Button } from 'react-bootstrap';
import ModelForm from '../ModalForm/ModelForm';

const CREDITCARDFORMDEFAULTVALUES = {
    Expiration: '',
    provider: '',
    address: '',
}


export default function SettingsCCTab() {

    const { state, dispatch } = useContext(ContextApp);

    return (
        <>
            {
                state.userProfile.account_number ?
                    <Card>
                        <Card.Header>{state.userProfile.provider} ending in {state.userProfile.account_number?.slice(-4)}</Card.Header>
                        <Card.Body>
                            <Card.Title>Expiration date</Card.Title>
                            <Card.Text>{`${state.userProfile.expires}`}</Card.Text>
                            <Card.Title>Name on card</Card.Title>
                            <Card.Text>{`${state.userProfile.first_name} ${state.userProfile.last_name}`}</Card.Text>
                            <Card.Title>Billing address</Card.Title>
                            <Card.Text>{`${state.userProfile.address_line1}`}</Card.Text>
                            <Card.Text>{`${state.userProfile.address_line2}`}</Card.Text>
                            <Card.Text>{`${state.userProfile.city}, ${state.userProfile.zip_code}`}</Card.Text>
                            <Card.Text>{`${state.userProfile.country_code}`}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} formBtnText='edit' />
                            <Button variant='light' className='rounded-pill bg-white'>Remove</Button>
                        </Card.Footer>
                    </Card>
                    :
                    <div>
                        <p>Add Payment Information</p>
                        <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} formBtnText='add' />
                    </div>
            }
        </>
    )
}