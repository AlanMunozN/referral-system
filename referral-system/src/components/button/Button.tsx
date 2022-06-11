import * as React from 'react';
import { Fab, FormControlLabel, Stack, styled, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './button.scss';

const ApexButton = styled(Fab)(({ theme }) => ({
  '&.MuiFab-root': {
    color: '#000',
  }
}));

export default function CreateButton() {
  return (
    <Stack spacing={2} direction="row">
      <a className='apex-button' href="/create" >
      <Fab color="primary" aria-label="add" >
        <AddIcon />
      </Fab>
      </a>
    </Stack>
  );
}