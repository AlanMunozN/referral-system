//Dependencies
import React, {useState} from "react";
import RefferralForm from "../../components/refferalform/RefferalForm";
import './index.scss'
import {useParams} from "react-router-dom";
import {Chip, CircularProgress, Divider, Stack} from "@mui/material";

const ReferralCreate = () => {
    const {id}: any = useParams();

    const [referralData, setReferralData] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        if (id) {
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            const referral = await data.json();
            console.log(referral);
            setReferralData(referral);
        }
        setIsLoaded(true);
    }

    return (
        <>
        <div className="main">
            <Divider>
                <Chip label="MY REFERRAL"></Chip>
            </Divider>
            {
                !isLoaded? <Stack sx={{ color: 'grey.500' }} spacing={10} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" />
            </Stack> :
                    <RefferralForm
                    firstName={referralData?.name || ''}
                    givenName={referralData?.username || ''}
                    lastName={referralData?.address.city || ''}
                    phone={ referralData? '52555555555' : ''}
                    email={referralData?.email || ''}
                    linkedin={referralData?.name || ''}
                    cv={referralData?.website || ''}
                />
            }
        </div>
        </>
    );
}
export default ReferralCreate;
