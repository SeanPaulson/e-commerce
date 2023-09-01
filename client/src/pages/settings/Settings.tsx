import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './settings.scss';
import SettingsTab from "../../components/settingsTab/SettingsTab";
import SettingsCCTab from '../../components/SettingsCCTab/SettingsCCTab';
import SettingsEmailTab from '../../components/SettingsEmailTab/SettingsEmailTab';
import SettingsAddressTab from '../../components/SettingsAddressTab/SettingsAddressTab';

export default function Settings() {

    return (
        <>
            <div className="settings__container">
                <Tabs variant="underline" transition={false} className="w-100 justify-content-between">
                    <Tab eventKey="settings" title='settings'>
                        <SettingsTab />
                    </Tab>
                    <Tab eventKey="profile" title='profile'>
                        item 2
                    </Tab>
                    <Tab eventKey="addresses" title='addresses'>
                        <SettingsAddressTab />
                    </Tab>
                    <Tab eventKey="creditCards" title='creditCards'>
                        <SettingsCCTab />
                    </Tab>
                    <Tab eventKey="emails" title='emails'>
                        <SettingsEmailTab />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}