import { useContext } from 'react';
import './_SettingsAddressTab.modules.scss';
import Card from 'react-bootstrap/esm/Card';
import { ContextApp } from '../UserContext';
import { Button } from 'react-bootstrap';
import ModelForm from '../ModalForm/ModelForm';
import { updateUserProfile } from '../../utils/fetchApi';
import { UserProfileType } from '../../utils/types';
import { ACTION_TYPES } from '../../reducers/profileReducer';
import { useSubmit } from 'react-router-dom';

const ADDRESSFORMDEFAULTVALUES = {
    address_line1: '',
    address_line2: 'empty',
    city: '',
    zip_code: '',
    country_code: '',
}


export default function SettingsCCTab() {

    const { state, dispatch } = useContext(ContextApp);
    const submit = useSubmit();

    const dispatchUserProfileState = (data: Partial<UserProfileType>) => {
        dispatch({ type: ACTION_TYPES.UPDATEADDRESS, payload: data });
    }
    const handleRemove = () => {
        try {
            //TODO PUT: users/profile set payment info to {} or undefined
            // dispatch({ type: ACTION_TYPES.DELETEPAYMENT, payload: {}})
            const newState = {
                address_line1: undefined,
                address_line2: undefined,
                city: undefined,
                zip_code: undefined,
                country_code: undefined,
            }
            submit({
                address_line1: '',
                address_line2: '',
                city: '',
                zip_code: '',
                country_code: '',
            }, {
                method: 'PUT',
                encType: 'multipart/form-data',
                action: '/settings'
            });
            dispatch({ type: ACTION_TYPES.DELETEADDRESS, payload: newState })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                state.userProfile.address_line1 ?
                    <Card>
                        <Card.Header>Address</Card.Header>
                        <Card.Body>
                            <Card.Title>Default</Card.Title>
                            <Card.Text>{state.userProfile.address_line1}</Card.Text>
                            <Card.Text>{state.userProfile.address_line2 === 'empty' ? '' : state.userProfile.address_line2}</Card.Text>
                            <Card.Text>{state.userProfile.city ?? state.userProfile.city} {state.userProfile.zip_code ?? state.userProfile.zip_code} {state.userProfile.country_code ?? state.userProfile.country_code}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ModelForm defaultValues={ADDRESSFORMDEFAULTVALUES} action={updateUserProfile} formBtnText='edit' cb={dispatchUserProfileState} />
                            <Button onClick={handleRemove} variant='light' className='rounded-pill bg-white'>Remove</Button>
                        </Card.Footer>
                    </Card>
                    :
                    <div>
                        <p>Add Address Information</p>
                        <ModelForm defaultValues={ADDRESSFORMDEFAULTVALUES} action={updateUserProfile} formBtnText='add' cb={dispatchUserProfileState} />
                    </div>
            }
        </>
    )
}