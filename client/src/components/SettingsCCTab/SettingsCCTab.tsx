import { useContext, useState } from 'react';
import './_settingsCCTab.modules.scss';
import Card from 'react-bootstrap/esm/Card';
import { ContextApp } from '../UserContext';
import { Button } from 'react-bootstrap';
import ModelForm from '../ModalForm/ModelForm';
import { updateUserProfile } from '../../utils/fetchApi';
import { UserProfileType } from '../../utils/types';
import { DateTime } from 'luxon';
import { useFormState } from '../../hooks/useFormState';
import { ACTION_TYPES } from '../../reducers/profileReducer';

const CREDITCARDFORMDEFAULTVALUES = {
    provider: '',
    expires: DateTime.now().toISODate() as string,
    account_number: 0
}


export default function SettingsCCTab() {

    const { state, dispatch } = useContext(ContextApp);
    // const [formState, setFormState] = useFormState<{[index: string]: string | Number | Date}>(CREDITCARDFORMDEFAULTVALUES);
    
    const dispatchUserProfileState = (data: Partial<UserProfileType>) => {
        dispatch({ type: ACTION_TYPES.UPDATEPAYMENT, payload: data });
    }
    const handleRemove = () => {
        try {
            //TODO PUT: users/profile set payment info to {} or undefined
        // dispatch({ type: ACTION_TYPES.DELETEPAYMENT, payload: {}})
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                state.userProfile.account_number ?
                    <Card>
                        <Card.Header>{state.userProfile.provider} ending in {state.userProfile.account_number}</Card.Header>
                        <Card.Body>
                            <Card.Title>Expiration date</Card.Title>
                            <Card.Text>{`${DateTime.fromISO(`${state.userProfile.expires}`).toISODate()}`}</Card.Text>
                            <Card.Title>Name on card</Card.Title>
                            <Card.Text>{`${state.userProfile.first_name} ${state.userProfile.last_name}`}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} action={updateUserProfile} formBtnText='edit' cb={dispatchUserProfileState} />
                            <Button onClick={handleRemove} variant='light' className='rounded-pill bg-white'>Remove</Button>
                        </Card.Footer>
                    </Card>
                    :
                    <div>
                        <p>Add Payment Information</p>
                        <ModelForm defaultValues={CREDITCARDFORMDEFAULTVALUES} action={updateUserProfile} formBtnText='add' cb={dispatchUserProfileState} />
                    </div>
            }
        </>
    )
}