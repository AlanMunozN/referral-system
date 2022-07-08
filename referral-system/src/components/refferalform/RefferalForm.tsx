import './refferal.scss'
import * as React from 'react';
import {useState} from 'react';
import Add from '@mui/icons-material/Add';
import {useParams} from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import { TagsInput } from "react-tag-input-component";
import * as EmailValidator from 'email-validator';
import {Restore, UndoOutlined} from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Stack,
    TextareaAutosize,
    TextField
} from '@mui/material';

export default function RefferralForm(this: any, props: any) {

    const initialState = {
        fullName: "",
        phone: "+52",
        email: "",
        linkedin: "",
        cv: "",
        tags: [],
        comments: "",
        ta_recruiter: ""
    };

    React.useEffect(() => {
        handleProps()
    }, [])

    const handleProps = () => {
        if (props) {
            setState({
                fullName: props.fullName,
                phone: props.phone,
                email: props.email,
                linkedin: props.linkedin? `https://www.linkedin.com/in/${props.linkedin}/` : '',
                cv: props.cv,
                tags: props.tag,
                comments: props.comments,
                ta_recruiter: props.ta_recruiter
            });
        }
    };

    const [
        { fullName, phone, email, linkedin, cv, tags, comments, ta_recruiter },
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
            case 'fullName':
                value = value.replace(/[^a-zA-Z\s]/gi, "");
                break;
            default:
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

    function handleTags(event: any) {
        const { id, value } = event;

        setState(prevState => ({ ...prevState, [id]: value }));
    }

    const [ta, setTa] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent<typeof ta>) => {
        setTa(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
      <Stack spacing={2} direction="column">
        <hr></hr>
        <div className="refferal-base">
            <form className='refferal-form'>
                <FormGroup>
                    <input id="referred-id" type="text" value={""} hidden>
                    </input>
                    <Stack spacing={4} direction="row">
                        <TextField
                            required
                            fullWidth
                            id="fullName"
                            type="text"
                            label="Full Name"
                            variant="outlined"
                            onChange={ handleInputValidations }
                            value={ fullName }
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
                    <Stack spacing={4} direction="row">
                    <TagsInput
                        value={tags}
                        onChange={ handleTags }
                        name="tags"
                        placeHolder="tech stacks"
                        onExisting={ handleTags }
                    />
                        { id && <div>
                            <FormControl sx={{ m: 1, minWidth: 220 }}>
                                <InputLabel id="ta_recruiter">TA recruiter</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={ta}
                                    label="Ta"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Ana'}>Ana</MenuItem>
                                    <MenuItem value={'Pedro'}>Pedro</MenuItem>
                                    <MenuItem value={'Juan'}>Juan</MenuItem>
                                </Select>
                            </FormControl>
                        </div> }
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <TextareaAutosize
                            id="comment"
                            maxRows={10}
                            aria-label="minimum height"
                            placeholder="Comments"
                            style={{ width: '100%', height: 180 }}
                            value={ comments }
                            onChange={ handleInputValidations }
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
