import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, CssBaseline, InputLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const Login = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://ccript-bcked.vercel.app/api/login', {
                name,
                password,
            });

            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);

            localStorage.setItem('refreshToken', refreshToken);

            navigate('/appointments');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                <Container component="main" maxWidth="xs">
                    <Grid item color='green' fontSize='4.2rem' margin-left='4rem'>
                        C<span className="flipped-c">Ↄ</span>ript
                    </Grid>
                    <form onSubmit={submitLogin}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            label='User Name'
                            fullWidth
                            id="username"
                            name="username"
                            placeholder='Enter User Name'
                            autoComplete="username"
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            label='Password'
                            placeholder='Enter Password'
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ marginTop: '1rem' }}
                        >
                            Sign In
                        </Button>
                    </form>
                    {/* </Paper> */}
                </Container>
            </header>
        </div>
    );
};

export default Login;