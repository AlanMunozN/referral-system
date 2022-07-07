import * as React from 'react';
import { Button, Fab, Stack, styled } from '@mui/material';
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
      <div className='apex-button'>
        <a href="/create">
          <Button type='submit' variant="contained" endIcon={<AddIcon />}>
            Create Referral
          </Button>
        </a>
      </div>
    </Stack>
  );
}