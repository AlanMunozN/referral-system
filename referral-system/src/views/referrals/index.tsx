//Dependencies
import React from "react";
import CreateButton from "../../components/button/Button";
import RefferralForm from "../../components/refferalform/RefferalForm";
import StickyHeadTable from "../../components/table/table";
import './index.scss'

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ApexSwitch from "../../components/apex_switch/ApexSwitch";

const MyReferral = () => {
    return (
        <>
        <div className="main">
            <Divider>
                <Chip label="MY REFERRAL"></Chip>
            </Divider>
            <br></br>
            <CreateButton/>
            <StickyHeadTable/>
        </div>
        </>
    );
}
export default MyReferral;
