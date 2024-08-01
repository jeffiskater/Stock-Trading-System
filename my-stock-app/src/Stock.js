import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import {
    TextField,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

function Stock() {

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await fetch('/api/stocks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setStocks(data);
                console.log('Fetched stocks:', data);
            } else {
                const text = await response.text();
                console.error('Expected JSON but received:', text);
            }
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const pages = ['Home', 'Stock', 'Price history', 'Analysis'];
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/stock" sx={{fontWeight: 'bold', color: '#AFA4A4'}}>
            Stock
        </Link>,
    ];
    const [ticker, setTicker] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', ticker);
    };

    const createData = (ticker, ticker_name, sectorNm, price, price1) => {
        return { ticker, ticker_name, sectorNm, price, price1 };
    };

    const rows = stocks.map(stock => createData(stock.ticker, stock.name, stock.sectorNm, stock.price, stock.price1));


    return (
        <div>
            <AppBar position="static" sx={{backgroundColor: '#AFA4A4'}}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{my: 2, color: 'white', display: 'block', fontWeight: 'bold'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{maxWidth: "xl", mt: 3}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        ml: 10,
                        my: 2,
                    }}
                >
                    <TextField
                        size="small"
                        label="Ticker Search"
                        variant="outlined"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)} // Update ticker value on change
                        sx={{
                            width: "180px",
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: '#AFA4A4',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#AFA4A4',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#AFA4A4',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#AFA4A4',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#AFA4A4',
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                        sx={{
                            backgroundColor: '#AFA4A4',
                            color: 'white',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: '#9e9e9e'
                            }
                        }}
                    >
                        Search
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 2,
                        my: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{
                            backgroundColor: '#AFA4A4',
                            color: 'white',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: '#9e9e9e'
                            }
                        }}
                    >
                        Add a stock
                    </Button>
                </Box>

                <TableContainer component={Paper} sx={{maxWidth: 800, margin: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#AFA4A4'}}>
                                <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Ticker</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Sector</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Price</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.ticker}>
                                    <TableCell component="th" scope="row" sx={{color: '#AFA4A4'}}>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.ticker_name}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sectorNm}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.price}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.price1}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        mt:4,
                    }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{
                        backgroundColor: '#AFA4A4',
                        color: 'white',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#9e9e9e'
                        }
                    }}
                >
                    Delete selected
                </Button>
                </Box>
            </Container>
        </div>
    );
}

export default Stock;
