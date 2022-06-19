import * as React from 'react';
import {useState} from 'react';
import {Button, FormGroup, Stack, styled, Switch, TextField} from '@mui/material';
import './refferal.scss'
import {Restore} from '@mui/icons-material';
import Add from '@mui/icons-material/Add';
import MuiPhoneNumber from "material-ui-phone-number";
import {IMaskInput} from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const ApexSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
        },
        '&:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
          left: 12,
        },
        '&:after': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
          )}" d="M19,13H5V11H19V13Z" /></svg>')`,
          right: 12,
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
      },
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
          color: '#44546A',
        },
      },
}));

export default function RefferralForm() {
    const [firstName, setFirstName] = useState("");
    const [givenName, setGivenName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedin] = useState("");

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
        console.log(event);
        console.log(event.target.id);

        switch (event.target.id) {
            case 'name':
                event.target.value = event.target.value.replace(/[^a-zA-Z\s]/gi, "");
                setFirstName(event.target.value);
                break;
            case 'given':
                event.target.value = event.target.value.replace(/[^a-zA-Z]/gi, "");
                setGivenName(event.target.value);
                break;
            case 'last':
                event.target.value = event.target.value.replace(/[^a-zA-Z]/gi, "");
                setLastName(event.target.value);
                break;
            case 'phone':
                setPhone(event.target.value);
                break;
            case 'linkedin':
                setLinkedin(event.target.value);
                break;
            case 'email':
                event.target.value = event.target.value.replace(/\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/, "");
                setEmail(event.target.value);
                break;
            default:
                console.log('this case is not defined in this form');
        }
    }

    function handleNumber(event: any) {
        setPhone(event.value);
    }

    const handleLinkedinOnFocus = () => {
        setLinkedin(linkedin.slice(28,-1));
    }

    const handleLinkedinOnBlur = () => {
        if(linkedin.length<1){
            setLinkedin('');
        }
        else {
            setLinkedin(`https://www.linkedin.com/in/${linkedin}/`);
        }
    }

    return (
      <Stack spacing={2} direction="column">
        <hr></hr>
        <div className="refferal-base">
            <form className='refferal-form'>
                <FormGroup>
                    <Stack spacing={4} direction="row">
                        <TextField id="name" type="text" label="First Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ firstName }/>
                        <TextField id="given" type="text" label="Given Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ givenName }/>
                        <TextField id="last" type="text" label="Last Name" variant="outlined" fullWidth onChange={ handleInputValidations } value={ lastName }/>
                    </Stack>
                    <br/>
{/*                    <Stack spacing={4} direction="row">
                        <MuiPhoneNumber defaultCountry={'mx'} value={phone} onChange={ handleNumber }/>

                        <TextField id="phone" type="text" label="Phone Number" variant="outlined"
                                   value={phone}
                                   onChange={handleInputValidations}
                                   InputProps={{
                                       inputComponent: TextMaskCustom as any,
                                   }}
                        />

                        <TextField id="phone" type="text" label="Phone Number" variant="outlined" fullWidth onChange={ handleInputValidations } value={ phone }/>

                    </Stack>
                    <br/>*/}
                    <Stack spacing={4} direction="row">
                        <MuiPhoneNumber defaultCountry={'mx'} value={phone} onChange={ handleNumber }/>

                        <TextField id="email" type="email" label="Email" variant="outlined" fullWidth onChange={ handleInputValidations } value={ email }/>
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <TextField id="linkedin" type="text" label="Linkedin UserName" variant="outlined" fullWidth onChange={ handleInputValidations } onFocus={ handleLinkedinOnFocus } onBlur={ handleLinkedinOnBlur } value={ linkedin }/>
                        <TextField id="cv" type="text" label="CV URL" variant="outlined" fullWidth />
                    </Stack>
                    <br/>
                    <div className='refferal-center'>
                        <Stack spacing={2} direction="row">
                            <Button type='reset' variant="contained" endIcon={<Restore />}>
                                Clear
                            </Button>
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
