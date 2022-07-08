//Dependencies
import { Chip, Divider } from "@mui/material";
import React from "react";
import ApexTable from "../../components/table/table";
import './index.scss'

const OpenPosition = () => {
    return (
    <>
        <div className="main">
            <Divider>
                <Chip label="Open Position"></Chip>
            </Divider>
            <br></br>
            <ApexTable/>
        </div>
    </>
    );
}
export default OpenPosition;
