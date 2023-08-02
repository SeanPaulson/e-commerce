import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './settings.scss';
import SettingsTab from "../../components/settingsTab/SettingsTab";

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
                        item 1
                    </Tab>
                    <Tab eventKey="creditCards" title='creditCards'>
                        item 2
                    </Tab>
                    <Tab eventKey="emails" title='emails'>
                        item 2
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}