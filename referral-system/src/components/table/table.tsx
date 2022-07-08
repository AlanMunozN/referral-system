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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {Chip, Stack} from "@mui/material";


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
    { id: 'Actions', label: 'Actions', minWidth: 120},
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

export function TestTable() {

    const [row, setRow] = useState<any[]>([]);
    const [col, setColumns] = useState<any[]>([]);

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const referral = await data.json();
        handleCorrectData(referral);
    }

    const handleCorrectData = (referrals: any ) => {
        let mock = 0;
        const mapping = referrals.map((data: any) => {
            console.log(data);
            mock = mock + 1;
            return {
                id: data.id,
                referred_by: data.name + ' ' + data.username,
                full_Name: data.name + ' ' + data.username,
                phone_number: '5555555555',
                email: data.email,
                linkedin_url: 'ko4',
                cv_url: 'ko5',
                tech_stacks: ['Java','Python','React','Javascript','ko6','ko6','ko6','ko6','ko6','ko6','ko6'],
                ta_recruiter: data.name,
                referral_status_id: 'in progress',
            }
        });
        setRow(mapping);
        console.log(mapping);
        const columns = [
            { field: "referred_by", headerName: "Referred_by", width: 290 },
            { field: "full_Name", headerName: "Full Name", width: 290 },
            { field: "phone_number", headerName: "Phone", width: 140 },
            { field: "email", headerName: "Email", width: 230, renderCell: (params: any) => (
            <Link to={'#'} onClick={() => {navigator.clipboard.writeText(params.value)}}>
                {params.value}
                <CopyAll className='copy-email-icon'></CopyAll>
            </Link>
                ),
            },
            { field: "linkedin_url", headerName: "Linkedin", width: 70, renderCell: (params: any) => (
                    <Link to={params.value}>
                        <LinkedIn></LinkedIn>
                    </Link>
                ),
            },
            { field: "cv_url", headerName: "CV", width: 40, renderCell: (params: any) => (
                    <Link to={params.value}>
                        <FileOpen></FileOpen>
                    </Link>
                ),
            },
            { field: "tech_stacks", headerName: "Tech Stacks", width: 300, renderCell: (params: any) => (
                    <Stack direction="row" spacing={1}>{
                        params.value.map((tech: string) => (
                    <Chip label={ tech }/>
                ))
                        }</Stack>
                ),
            },
            { field: "ta_recruiter", headerName: "Ta Recruiter", width: 290 },
            { field: "referral_status_id", headerName: "Status", width: 190 },
            { field: "id", headerName: "Actions", width: 100, renderCell: (params: any) => (
                    <Box sx={{ '& button': { m: 1 } }}>
                        <div>
                            <IconButton color="primary" component="span">
                                <Link to={`/referrals/edit/${params.value}`}>
                                    <Edit/>
                                </Link>
                            </IconButton>
                            <IconButton color="primary" component="span">
                                <Link to={'#'}>
                                <Delete/>
                                </Link>
                            </IconButton>
                        </div>
                    </Box>
                ),
            },
    ];
        setColumns(columns);
        console.log((mapping));
    }


    const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
    const { data } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });
    const myRow = row.map(( rows ) => ({
        id: rows.id,
        referred_by: rows.referred_by,
        full_Name: rows.full_Name,
        phone_number: rows.phone_number,
        email: rows.email,
        linkedin_url: <LinkedIn></LinkedIn>,
        cv_url: rows.cv_url,
        tech_stacks: rows.tech_stacks,
        ta_recruiter: rows.ta_recruiter,
        referral_status_id: rows.referral_status_id,
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={myRow}
                columns={col}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20, 50]}
            />
        </div>
    );
}

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
