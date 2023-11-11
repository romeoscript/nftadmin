import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function Fund() {
    const theme = useTheme();

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState(0);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleBalanceChange = (event) => {
        // Convert the input value to a number
        const newBalance = Number(event.target.value);
        setBalance(newBalance);
        console.log(balance);
      };
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6ImRvZUBnbWFpbC5jb20iLCJpYXQiOjE2OTk1NTc2NjZ9.vmyjbI_Hg-VFQqfVbmIAkOXBYUSVrNxMbivRSfHr3zU'
 
    const updateBalance = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Replace with your token if needed
                // Add other headers as required
            };
            const response = await axios.patch('https://nftapi-production-405a.up.railway.app/balance', {
                email,
                balance
            }, { headers });

            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Balance updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/'); // Redirect on success
                }
            });
        } catch (error) {
            console.error('Error updating balance', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error updating balance',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleClick = () => {
        updateBalance();
        // You might want to move or modify this line
    };
    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" value={email} label="Email address" onChange={handleEmailChange} />

                <TextField
                    name="password"
                    label="amount"
                    type='number'
                    value={balance}
                    onChange={handleBalanceChange}
                />
            </Stack>

            <br />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleClick}
            >
                Fund
            </LoadingButton>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Fund Account</Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
