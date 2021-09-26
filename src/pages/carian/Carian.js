import { Pane, SelectField, ArrowLeftIcon } from 'evergreen-ui'
import React,{ useState } from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import Navbar from '../../components/Navbars/AdminNavbar'
import Sidebar from '../../Sidebar'
import Topbar from '../../Topbar2'
import CarianList from './CarianList'
import { TRANSLATION } from '../../Translation';
import { ContextHandler } from "../../contexts/ContextHandler";
import { useContext } from 'react'

function Carian() {
    const {language} = useContext(ContextHandler)
    const [type, setType] = useState('');
    const history = useHistory()
    const location = useLocation();

    return (
        <div>
            <Sidebar />
            <div className="relative md:ml-64" style={{ height: "100vh", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
                <Navbar />
                <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
                    <div className="flex flex-wrap ">
                        <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                            <Topbar title={TRANSLATION[language].SEARCH.TITLE+" / "+ location.state.title} leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => history.goBack()} />
                        </Pane>
                    </div>
                    <div className="flex flex-wrap xl:pt-2">
                        <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                            <SelectField
                                label={TRANSLATION[language].SEARCH.TITLE +" "+ location.state.title}
                                description={TRANSLATION[language].SEARCH.SUBTITLE}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value='tiada'>-- {TRANSLATION[language].SEARCH.MENU.SELECT} --</option>
                                <option value="kp">{TRANSLATION[language].SEARCH.MENU.NOKP.TITLE}</option>
                                <option value="ssm">{TRANSLATION[language].SEARCH.MENU.NOSSM.TITLE}</option>
                                <option value="akaun">{TRANSLATION[language].SEARCH.MENU.ACCOUNT.TITLE}</option>
                            </SelectField>
                            <CarianList type={type} code={location.state.code} carianBy = {location.state.type}/>
                        </Pane>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Carian
