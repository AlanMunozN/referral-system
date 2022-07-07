//Dependencies
import { Chip, Divider } from "@mui/material";
import React from "react";
import StickyHeadTable, {TestTable} from "../../components/table/table";
import './index.scss'

const OpenPosition = () => {
    return (
    <>
        <div className="main">
        <Divider>
                <Chip label="Open Position"></Chip>
            </Divider>
            <br></br>
            <TestTable/>
            <StickyHeadTable/>
        </div>
    </>
    );
}
export default OpenPosition;
