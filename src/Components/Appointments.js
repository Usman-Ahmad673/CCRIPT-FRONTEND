import React, { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import CachedIcon from '@mui/icons-material/Cached';
import {
    AppBar,
    Container,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointments = () => {
    const navigate = useNavigate()

    const timeSlots = [
        { day: 'Monday', time: '8:00 AM', appointment: 'Usman Ahmad Reason Lorem Ipsum' },
        { day: 'Tuesday', time: '9:00 AM' },
        { day: 'Wednesday', time: '10:00 AM', appointment: 'Usman Ahmad Reason Lorem Ipsum' },
        { day: 'Thursday', time: '11:00 AM' },
        { day: 'Friday', time: '12:00 PM' },
        { day: 'Saturday', time: '1:00 PM' },
        { day: 'Sunday', time: '2:00 PM' },
    ];

    const daysToSlots = timeSlots.reduce((acc, slot) => {
        if (!acc[slot.day]) {
            acc[slot.day] = [];
        }
        acc[slot.day].push({ time: slot.time, appointment: slot.appointment });
        return acc;
    }, {});
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hoursInDay = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'];

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    console.error('Token is missing');
                    navigate('/')
                    return;
                }


                const response = await axios.get('https://ccript-bcked.vercel.app/api/appointments', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // localStorage.removeItem('token');
                console.log("called")
                setAppointments(response.data?.appointments);
            } catch (error) {
                console.error('Error fetching appointments:', error ? error : '');
                console.log("Response : ", error.response.data?.success)
                if (error.response.data?.success == false) {
                    if (error.response.data?.success == false || error.response.status === 401) {
                        console.error('Token expired');
                        const refreshToken = localStorage.getItem('refreshToken');

                        const resp = await axios.get('https://ccript-bcked.vercel.app/api/refresh-token', {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        });
                        console.log("RESP : ", resp)
                        localStorage.setItem('accessToken', resp.data?.accessToken);
                        console.log("new access token")

                        // localStorage.removeItem('accessToken');
                        // navigate('/')
                    }
                }
            }

        }
        fetchAppointments();
    }, [navigate, localStorage]);

    // console.log('Appointments');
    // console.log(appointmentsppointments);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/')
    }

    return (
        <React.Fragment>
            <Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <AppBar position='static' sx={{ backgroundColor: 'white', padding: '1.3rem' }}>
                        <Toolbar>
                            <Grid container alignItems='center' color='black'>
                                <Grid item color='green' fontSize='4.2rem'>
                                    C<span className="flipped-c">Ↄ</span>ript
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='flex-end'>
                                <IconButton sx={{
                                    backgroundColor: 'red', color: 'white', borderRadius: '0.2rem', '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '0.2rem'
                                    }
                                }}
                                    onClick={logout}
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
            <Grid display='flex' justifyContent='flex-end' alignItems='center' maxWidth='lg' margin='6.5rem auto'>
                <TableContainer sx={{ borderRadius: '1.5rem', border: '1px solid gray' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'green', border: '1px solid black', width: '20px' }}>
                                    <CachedIcon />
                                </TableCell>
                                {daysOfWeek.map((day, index) => (
                                    <TableCell key={index} sx={{ border: '1px solid black', width: '20px' }}>
                                        {day}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeSlots.map((slot, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: '1px solid black' }}>{slot.time}</TableCell>
                                    {daysOfWeek.map((day, idx) => (
                                        <TableCell
                                            key={idx}
                                            sx={{
                                                border: '1px solid black',
                                                width: '20px',
                                                backgroundColor:
                                                    daysToSlots[day].find((s) => s.time === slot.time)?.appointment
                                                        ? 'lightblue'
                                                        : 'inherit',
                                            }}
                                        >
                                            {daysToSlots[day].find((s) => s.time === slot.time)?.appointment || ''}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </React.Fragment>
    );
};
export default Appointments;