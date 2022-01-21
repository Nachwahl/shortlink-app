import React from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    Container,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow
} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {GroupRounded, LinkRounded} from "@mui/icons-material";
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json())


const admin = props => {
    const [value, setValue] = React.useState(0);

    return (
        <div>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Users" icon={<GroupRounded />} />
                    <BottomNavigationAction label="Links" icon={<LinkRounded />} />
                </BottomNavigation>
            </Paper>

            {
                value === 0 && <Users />
            }

        </div>
    );
}

const Users = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { data } = useSWR(`/api/admin/users?page=${page}&rows=${rowsPerPage}`, fetcher);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Users</h1>
            <Container style={{marginTop: "2%", marginBottom: "2%"}}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((user) =>
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 2, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </div>
    );
}

export default admin
