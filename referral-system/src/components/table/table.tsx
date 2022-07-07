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
import {useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import {FileOpen, LinkedIn, CopyAll, Edit, Delete} from '@mui/icons-material/';
import './table.scss';


interface Column {
    id: 'userId' | 'firstName' | 'phoneNumber' | 'Email' | 'Linkedin' | 'CV' | 'Actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'firstName', label: 'Full Name', minWidth: 100 },
    { id: 'phoneNumber', label: 'Phone', minWidth: 100 },
    { id: 'Email', label: 'Email', minWidth: 260 },
    { id: 'Linkedin', label: 'Linkedin', minWidth: 60 },
    { id: 'CV', label: 'CV', minWidth: 60 },
    { id: 'Actions', label: 'Actions', minWidth: 30},
];

interface Data {
    userId: number;
    firstName: string;
    phoneNumber: string;
    Email: string;
    Linkedin: string;
    CV: string;
    Actions: object;
}

function createData(
    userId: number,
    firstName: string,
    phoneNumber: string,
    Email: string,
    Linkedin: string,
    CV: string
): Data {
    const Actions = ( <CrudButton/> );
    return { userId, firstName, phoneNumber, Email, Linkedin, CV, Actions };
}

// TODO delete this commented code
// const rows = [
//     createData(1, 'Jose', 'Diaz', 'Gonzales', '5555555555', 'test@test.com', 'linkedin@josedg', 'www.test.com/cv.pdf'),
//     createData(2, 'Alejandro', 'Marti', 'Escalante', '5555555555', 'test@test.com', 'linkedin@josedg', 'www.test.com/cv2.pdf'),
//     createData(3, 'Mario', 'Marin', 'Pochat', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
//     createData(4, 'Eduardo', 'Telles', 'Lopez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
//     createData(5, 'Ricardo', 'Montalban', 'Gutierrez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
//     createData(5, 'Gustavo', 'Garcia', 'Marquez', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf'),
//     createData(6, 'Alberto', 'Suarez', 'Mojarres', '5555555555', 'test1@test.com', 'linkedin@asuarez', 'www.test.com/cv3.pdf')
// ];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(13);

    const [myData, setMyData] = useState<any[]>([]);

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const referral = await data.json();
        console.log(referral);
        setMyData(referral);
    }

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
                                    align={'left'}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((data) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                                        <TableCell key={data.id+'A1'} align={'left'}>
                                            {data.name + ' ' + data.username}
                                        </TableCell>
                                        {/* <TableCell key={data.id+'A2'} align={'left'}>
                                            {data.username}
                                        </TableCell>
                                        <TableCell key={data.id+'A3'} align={'left'}>
                                            {data.address.city}
                                        </TableCell> */}
                                        <TableCell key={data.id+'A4'} align={'left'}>
                                            5555555555
                                        </TableCell>
                                        <TableCell key={data.id+'A5'} align={'left'}>
                                            {data.email}
                                            <Link to={'#'} onClick={() => {navigator.clipboard.writeText(data.email)}}>
                                                <CopyAll className='copy-email-icon'></CopyAll>
                                            </Link>
                                        </TableCell>
                                        <TableCell key={data.id+'A6'} align={'left'}>
                                            <Link to={'#'}>
                                                {/* {data.website} */}
                                                <LinkedIn></LinkedIn>
                                            </Link>
                                        </TableCell>
                                        <TableCell key={data.id+'A7'} align={'left'}>
                                            <Link to={'#'}>
                                                <FileOpen></FileOpen>
                                            </Link>
                                        </TableCell>
                                        <TableCell key={data.id+'A8'} align={'left'}>
                                            <Box sx={{ '& button': { m: 1 } }}>
                                                <div>
                                                    <IconButton color="primary" component="span">
                                                        <Link to={`/referrals/edit/${data.id}`}>
                                                            <Edit/>
                                                        </Link>
                                                    </IconButton>
                                                    <IconButton color="primary" component="span">
                                                        <Delete/>
                                                    </IconButton>
                                                </div>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                component="div"
                count={myData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
