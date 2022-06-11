import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CrudButton from '../crudbuttons/crudbutton';

interface Column {
    id: 'userId' | 'firstName' | 'givenName' | 'lastName' | 'phoneNumber' | 'Email' | 'Linkedin' | 'CV' | 'Actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'userId', label: 'ID', minWidth: 2 },
    { id: 'firstName', label: 'Name', minWidth: 100 },
    { id: 'givenName', label: 'Given Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'phoneNumber', label: 'Phone', minWidth: 80 },
    { id: 'Email', label: 'Email', minWidth: 190 },
    { id: 'Linkedin', label: 'Linkedin', minWidth: 190 },
    { id: 'CV', label: 'CV', minWidth: 190 },
    { id: 'Actions', label: 'Actions', minWidth: 30 },
];

interface Data {
    userId: number;
    firstName: string;
    givenName: string;
    lastName: string;
    phoneNumber: string;
    Email: string;
    Linkedin: string;
    CV: string;
    Actions: object;
}

function createData(
    userId: number,
    firstName: string,
    givenName: string,
    lastName: string,
    phoneNumber: string,
    Email: string,
    Linkedin: string,
    CV: string
): Data {
    const Actions = ( <CrudButton/> );
    return { userId, firstName, givenName, lastName, phoneNumber, Email, Linkedin, CV, Actions };
}

const rows = [
    createData(1, 'Jose', 'Diaz', 'Gonzales', '5555555555', 'test@test.com', 'linkedin@josedg', 'www.test.com/cv.pdf'),
    createData(2, 'Alejandro', 'Marti', 'Escalante', '5555555555', 'test@test.com', 'linkedin@josedg', 'www.test.com/cv2.pdf'),
    createData(3, 'Mario', 'Marin', 'Pochat', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
    createData(4, 'Eduardo', 'Telles', 'Lopez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
    createData(5, 'Ricardo', 'Montalban', 'Gutierrez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
    createData(5, 'Gustavo', 'Garcia', 'Marquez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
    createData(6, 'Alberto', 'Suarez', 'Mojarres', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf')
];

export default function StickyHeadTable() {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
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
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
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
