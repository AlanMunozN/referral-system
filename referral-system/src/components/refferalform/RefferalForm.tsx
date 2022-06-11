import * as React from 'react';
import { FormGroup, FormControlLabel, Stack, styled, Switch, TextField, Button } from '@mui/material';
import './refferal.scss'
import SendIcon from '@mui/icons-material/Send';
import { AddAlarmOutlined, Clear, ClearAll, ClearTwoTone, Delete, Restore } from '@mui/icons-material';
import Add from '@mui/icons-material/Add';

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
    return (
      <Stack spacing={2} direction="column">
        <hr></hr>
        <div className="refferal-base">
            <form className='refferal-form'>
                <FormGroup>
                    <Stack spacing={4} direction="row">
                        <TextField id="name" type="text" label="First Name" variant="outlined" fullWidth />
                        <TextField id="given" type="text" label="Given Name" variant="outlined" fullWidth />
                        <TextField id="last" type="text" label="Last Name" variant="outlined" fullWidth />
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <TextField id="phone" type="text" label="Phone Number" variant="outlined" fullWidth />
                        <TextField id="email" type="email" label="Email" variant="outlined" fullWidth />
                    </Stack>
                    <br/>
                    <Stack spacing={4} direction="row">
                        <TextField id="linkedin" type="text" label="Linkedin URL" variant="outlined" fullWidth />
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