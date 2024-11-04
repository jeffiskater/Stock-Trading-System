import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const stocks = [
    { code: 'AAPL', name: 'Apple Inc.', price: 150.00, changePrice: 2.5, changePercent: 1.70 },
    { code: 'GOOGL', name: 'Alphabet Inc.', price: 2800.00, changePrice: -15, changePercent: -0.53 },
    { code: 'MSFT', name: 'Microsoft Corporation', price: 300.00, changePrice: 5, changePercent: 1.70 },
    { code: 'TSLA', name: 'Tesla Inc.', price: 750.00, changePrice: -10, changePercent: -1.32 },
    { code: 'AMZN', name: 'Amazon.com Inc.', price: 3400.00, changePrice: 30, changePercent: 0.89 },
    { code: 'FB', name: 'Meta Platforms Inc.', price: 350.00, changePrice: 12, changePercent: 3.57 },
    { code: 'NFLX', name: 'Netflix Inc.', price: 500.00, changePrice: -5, changePercent: -1.00 },
    { code: 'NVDA', name: 'NVIDIA Corporation', price: 800.00, changePrice: 15, changePercent: 1.91 },
    { code: 'INTC', name: 'Intel Corporation', price: 50.00, changePrice: -1, changePercent: -1.96 },
    { code: 'CSCO', name: 'Cisco Systems Inc.', price: 55.00, changePrice: 1.2, changePercent: 2.22 },
];

const news = [
    {
        title: "Apple's latest iPhone launched",
        description: "Apple unveils its latest iPhone with improved performance and new features.",
        image: '/img_2.png',
    },
    {
        title: "Google's new AI feature",
        description: "Google introduces a powerful AI tool that changes the landscape of technology.",
        image: '/img_3.png',
    },
];

const setCurrentTicker = (ticker, navigate) => {
    localStorage.setItem('currentTicker', ticker);
    navigate(`/Ticker`);
}

function createStockTable(rows, navigate) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ticker</TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Price Change</TableCell>
                        <TableCell align="right">Change %</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.code}
                            hover
                            onClick={() => setCurrentTicker(row.code, navigate)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>{row.code}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: row.changePrice >= 0 ? 'green' : 'red' }}
                            >
                                {row.changePrice.toFixed(2)}
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: row.changePercent >= 0 ? 'green' : 'red' }}
                            >
                                {row.changePercent.toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function createNewsCards(news) {
    return news.map((item, index) => (
        <Card key={index} sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={item.image}
                alt={item.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h6" variant="h6">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    ));
}

function DemoPageContent({ pathname }) {
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Stack spacing={2} sx={{ width: 700 }}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={stocks.map((option) => option.name)}
                    onChange={(event, value) => {
                        const selectedStock = stocks.find(stock => stock.name === value);
                        if (selectedStock) {
                            setCurrentTicker(selectedStock.code, navigate);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search for stocks"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search',
                                },
                            }}
                        />
                    )}
                />
            </Stack>

            <Grid container spacing={2} sx={{ width: '100%', mt: 4 }}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h6" align="left">You may be interested in</Typography>
                    <Divider sx={{ borderBottomWidth: 2, borderStyle: 'solid', my: 2 }} />
                    {createStockTable(stocks, navigate)} {/* 传递 navigate */}
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography variant="h6" align="left">Today's financial news</Typography>
                    <Divider sx={{ borderBottomWidth: 2, borderStyle: 'solid', my: 2 }} />
                    {createNewsCards(news)}
                </Grid>
            </Grid>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
    const [pathname, setPathname] = useState('/dashboard');

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return (
        <AppProvider
            navigation={[
                { segment: 'dashboard', title: 'Home', icon: <DashboardIcon /> },
            ]}
            router={router}
            theme={createTheme()}
        >
            <DashboardLayout>
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

function Dashboard() {
    return <DashboardLayoutBasic />;
}

export default Dashboard;
