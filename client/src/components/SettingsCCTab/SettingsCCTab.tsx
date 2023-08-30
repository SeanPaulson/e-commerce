import { useContext } from 'react';
import './_settingsCCTab.modules.scss';
import Card from 'react-bootstrap/esm/Card';
import { ContextApp } from '../UserContext';
import { Button } from 'react-bootstrap';
import ModelForm from '../ModalForm/ModelForm';
import { updateUserProfile } from '../../utils/fetchApi';
import { UserProfileType } from '../../utils/types';
import { DateTime } from 'luxon';

const CREDITCARDFORMDEFAULTVALUES = {
    provider: '',
    expires: DateTime.now().toISODate() as string,
    account_number: 0
}


export default function SettingsCCTab() {

    const { state, dispatch } = useContext(ContextApp);

    const submitAction = async (data: Partial<UserProfileType>) => {
        console.log(data)
        const res = await updateUserProfile(data)
    }


    return (
        <>
            {
                state.userProfile.account_number ?
                    <Card>
                        <Card.Header>{state.userProfile.provider} ending in {state.userProfile.account_number}</Card.Header>
                        <Card.Body>
                            <Card.Title>Expiration date</Card.Title>
                            <Card.Text>{`${state.userProfile.expires}`}</Card.Text>
                            <Card.Title>Name on card</Card.Title>
                            <Card.Text>{`${state.userProfile.first_name} ${state.userProfile.last_name}`}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} action={submitAction} formBtnText='edit' />
                            <Button variant='light' className='rounded-pill bg-white'>Remove</Button>
                        </Card.Footer>
                    </Card>
                    :
                    <div>
                        <p>Add Payment Information</p>
                        <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} action={submitAction} formBtnText='add' />
                    </div>
            }
        </>
    )
}