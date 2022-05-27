import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PositionsService from "../../service/PositionsService";
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SeeReferralsIcon from '@mui/icons-material/Toc';
import MakeReferralsIcon from '@mui/icons-material/PersonAddAlt1';


interface Column {
  id: 'client' | 'grade' | 'quantity' | 'referral_bonus' | 'priority' | 'bullhorn_id' | 'created_at';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'client', label: 'Client', minWidth: 170 },
  { id: 'grade', label: 'Grade', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'referral_bonus',
    label: 'Bonus',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'priority', label: 'Priority', minWidth: 100 },
  {
    id: 'bullhorn_id',
    label: 'Bullhorn ID',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  { id: 'created_at', label: 'Created at', minWidth: 100 },
];

interface Data {
  client: string;
  grade: string;
  quantity: number;
  referral_bonus: number;
  priority: string;
  bullhorn_id: number;
  created_at: string;
}

function createData(
  client: string,
  grade: string,
  quantity: number,
  referral_bonus: number,
  priority: string,
  bullhorn_id: number,
  created_at: string,
): Data {
  return { client, grade, quantity, referral_bonus, priority, bullhorn_id, created_at };
}

//const rows = (new PositionsService()).getPositions();
const rows = [
  {
    client: 'CLIENT 001',
    grade: 'Jr',
    quantity: 10,
    referral_bonus: 100,
    priority: 'Low',
    bullhorn_id: 666,
    created_at: '2022-05-27'
  },
  {
    client: 'CLIENT 002',
    grade: 'Mid',
    quantity: 10,
    referral_bonus: 200,
    priority: 'High',
    bullhorn_id: 666,
    created_at: '2022-05-27'
  },
  {
    client: 'CLIENT 003',
    grade: 'Sr',
    quantity: 10,
    referral_bonus: 300,
    priority: 'High',
    bullhorn_id: 666,
    created_at: '2022-05-27'
  },
  {
    client: 'CLIENT 004',
    grade: 'Manager',
    quantity: 10,
    referral_bonus: 1000,
    priority: 'Medium',
    bullhorn_id: 666,
    created_at: '2022-05-27'
  },
  {
    client: 'CLIENT 005',
    grade: 'Director',
    quantity: 10,
    referral_bonus: 2000,
    priority: 'Normal',
    bullhorn_id: 666,
    created_at: '2022-05-27'
  },
]

export default function TablePositions() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                colSpan={4}
                align='center'
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ [Date.now(),Math.floor(Math.random() * 100)].join('-')}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      align='center'
                    >
                      <EditIcon></EditIcon>
                    </TableCell>
                    <TableCell
                      align='center'
                    >
                      <DeleteIcon></DeleteIcon>
                    </TableCell>
                    <TableCell
                      align='center'
                    >
                      <SeeReferralsIcon></SeeReferralsIcon>
                    </TableCell>
                    <TableCell
                      align='center'
                    >
                      <MakeReferralsIcon></MakeReferralsIcon>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[7, 13, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
