import './refferal.scss'
import * as React from 'react';
import {useState} from 'react';
import {IMaskInput} from 'react-imask';
import Add from '@mui/icons-material/Add';
import {useParams} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import {Restore, UndoOutlined} from '@mui/icons-material';
import {Button, FormGroup, Stack, TextField} from '@mui/material';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export default function RefferralForm(props: any) {

    const initialState = {
        firstName: "",
        givenName: "",
        lastName: "",
        phone: "",
        email: "",
        linkedin: "",
        cv: ""
    };

    React.useEffect(() => {
        handleProps()
    }, [])

    const handleProps = () => {
        if (props) {
            setState({
                firstName: props.firstName,
                givenName: props.givenName,
                lastName: props.lastName,
                phone: props.phone,
                email: props.email,
                linkedin: props.linkedin? `https://www.linkedin.com/in/${props.linkedin}/` : '',
                cv: props.cv
            });
        }
    };

    const [
        { firstName, givenName, lastName, phone, email, linkedin, cv },
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
        setState(prevState => ({ ...prevState, ['phone']: '52' }));
    };

    const {id}: any = useParams();

    const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
        function TextMaskCustom(props, ref: any) {
            const { onChange } = props;
            return (
                <IMaskInput
                    mask="(#0) 000-000-0000"
                    definitions={{
                        '#': /[1-9]/,
                    }}
                    onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                />
            );
        },
    );

    const handleInputValidations = (event: any) => {
        let { id, value } = event.target;

        switch (id) {
            case 'firstName':
                value = value.replace(/[^a-zA-Z\s]/gi, "");
                break;
            case 'given':
                value = value.replace(/[^a-zA-Z]/gi, "");
                break;
            case 'last':
                value = value.replace(/[^a-zA-Z]/gi, "");
                break;
            // case 'linkedin':
            //     value = value.replace(/[^a-zA-Z]/gi, "");
            //     break;
            case 'email':
                // event = event.replace(/\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/, "");
                break;
        }
        setState(prevState => ({ ...prevState, [id]: value }));
    }

    function handleNumber(event: any) {
        const { value, id } = event;

        setState(prevState => ({ ...prevState, [id]: value }));
    }

    const handleLinkedinOnFocus = (event: any) => {
        const { id, value } = event.target;
        setState(prevState => ({ ...prevState, [id]: value.slice(28,-1) }));
    }

    const handleLinkedinOnBlur = (event: any) => {
        const { id, value } = event.target;

        if(value.length<1){
            setState(prevState => ({ ...prevState, [id]: '' }));
        }
        else {
            setState(prevState => ({ ...prevState, [id]: `https://www.linkedin.com/in/${value}/` }));
        }
    }

    return (
      <Stack spacing={2} direction="column">
        <hr></hr>
        <div className="refferal-base">
            <form className='refferal-form'>
                <FormGroup>
                    <Stack spacing={4} direction="row">
                        <TextField id="firstName" type="text" label="First Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ firstName }/>
                        <TextField id="givenName" type="text" label="Given Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ givenName }/>
                        <TextField id="lastName" type="text" label="Last Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ lastName }/>
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <PhoneInput
                            country={ 'mx' }
                            value={ phone }
                            onChange={ handleNumber }
                        />
                        <TextField
                            // error
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            defaultValue="Email"
                            helperText="Incorrect entry."
                            value={ email }
                            onChange={ handleInputValidations }
                        />
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <TextField
                            fullWidth
                            id="linkedin"
                            type="text"
                            label="Linkedin UserName"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            onFocus={ handleLinkedinOnFocus }
                            onBlur={ handleLinkedinOnBlur }
                            value={ linkedin }
                        />
                        <TextField
                            fullWidth
                            id="cv"
                            type="text"
                            label="CV URL"
                            variant="outlined"
                            onChange={ handleInputValidations } value={ cv }
                        />
                    </Stack>
                    <br/>
                    <div className='refferal-center'>
                        <Stack spacing={2} direction="row">
                            <Button type='reset' variant="contained" endIcon={<Restore />} onClick={clearState}>
                                Clear
                            </Button>
                            { id && <Button type='reset' variant="contained" endIcon={<UndoOutlined />} onClick={handleProps}>
                                Undo
                            </Button> }
                            <Button type='submit' variant="contained" endIcon={<Add />}>
                                Save
                            </Button>
                        </Stack>
                    </div>
                </FormGroup>
            </form>
        </div>
      </Stack>
    );
  }
