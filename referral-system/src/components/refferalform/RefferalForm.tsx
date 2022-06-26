import './refferal.scss'
import * as React from 'react';
import {useState} from 'react';
import Add from '@mui/icons-material/Add';
import {useParams} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import * as EmailValidator from 'email-validator';
import {Restore, UndoOutlined} from '@mui/icons-material';
import {Button, FormGroup, Stack, TextField} from '@mui/material';

export default function RefferralForm(this: any, props: any) {

    const initialState = {
        firstName: "",
        givenName: "",
        lastName: "",
        phone: "+52",
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
        setState(prevState => ({ ...prevState }));
    };

    const {id}: any = useParams();

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

    const isValidURL = (string: string) => {
        var res = string.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
        return (res !== null)
    };

    const isEmptyString = (str: string) => {
        return (typeof str === 'string' && str.trim().length === 0);
    };

    return (
      <Stack spacing={2} direction="column">
        <hr></hr>
        <div className="refferal-base">
            <form className='refferal-form'>
                <FormGroup>
                    <Stack spacing={4} direction="row">
                        <TextField
                            required
                            fullWidth
                            id="firstName"
                            type="text"
                            label="First Name"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            value={ firstName }
                        />
                        <TextField 
                            fullWidth
                            id="givenName"
                            type="text"
                            label="Given Name"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            value={ givenName }
                        />
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            type="text"
                            label="Last Name"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            value={ lastName }
                        />
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <PhoneInput
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                                }}
                            country={ 'mx' }
                            value={ phone }
                            onChange={ handleNumber }
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            defaultValue="Email"
                            value={ email }
                            onChange={ handleInputValidations }
                            error={ (isEmptyString(email) ? false : !EmailValidator.validate(email)) }
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
                            required
                            fullWidth
                            id="cv"
                            type="text"
                            label="CV URL"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            value={ cv }
                            error={ (isEmptyString(cv) ? false : !isValidURL(cv)) }
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
