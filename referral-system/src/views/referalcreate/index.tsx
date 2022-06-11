//Dependencies
import React from "react";
import CreateButton from "../../components/button/Button";
import RefferralForm from "../../components/refferalform/RefferalForm";
import './index.scss'

const ReferralCreate = () => {
    return (
        <>
        <div className="main">
            <h2>My Referral</h2>
            {/* <CreateButton/> */}
            <RefferralForm/>
        </div>
        </>
    );
}
export default ReferralCreate;
