import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Pagination, IconButton, Checkbox, Link, Breadcrumbs, Container, Toolbar, AppBar, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

function Analysis() {

    const {ticker} = useParams();
    const [priceHists, setPriceHists] = useState([]);


    const [totalPriceHistPages, setTotalPriceHistPages] = useState(0);
    const [currentPriceHistPage, setCurrentPriceHistPage] = useState(1);
    const rowsPerPagePriceHist = 10;


    useEffect(() => {
        fetchPriceHist()
    }, [currentPriceHistPage]);

    const fetchPriceHist = async () => {
        try {
            const url = `/api/priceHists/${ticker}?page=${currentPriceHistPage - 1}&size=${rowsPerPagePriceHist}&sort=datetime,desc`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();

                const priceHistsArray = Array.isArray(data.content) ? data.content : [data.content];
                setPriceHists(priceHistsArray);

                setTotalPriceHistPages(data.totalPages || 0);
                setCurrentPriceHistPage(data.number + 1);

                console.log('Fetched price histories:', priceHistsArray);
            } else {
                const text = await response.text();
                console.error('Expected JSON but received:', text);
            }
        } catch (error) {
            console.error('Error fetching price histories:', error);
        }
    };

    const pages = ['Home', 'Stock', 'Price history', 'Analysis'];
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/stock" sx={{fontWeight: 'bold', color: '#AFA4A4'}}>
            Analysis
        </Link>,
    ];

    const price_hists = priceHists.map((hist) => ({
        ticker: hist.id.ticker,
        datetime: hist.id.datetime,
        open: hist.open,
        high: hist.high,
        low: hist.low,
        close: hist.close,
        volume: hist.volume,
        sma5: hist.sma5,
        sma10: hist.sma10,
        sma21: hist.sma21,
        sma50: hist.sma50
    }));


    return (
        <div>
            <AppBar position="static" sx={{backgroundColor: '#AFA4A4'}}>
                <Container>
                    <Toolbar>
                        <Box display="flex" gap={6}>
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


            <div style={{width: "100%"}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb" ml={20} mt={4}>
                    {breadcrumbs}
                </Breadcrumbs>
                <Box>

                </Box>
                <TableContainer component={Paper} sx={{maxWidth: 2200, minHeight: 784, margin: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#AFA4A4',height: "70px"}}>
                                <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Ticker</TableCell>
                                <TableCell align="left" sx={{color: 'white', fontWeight: 'bold'}}>Datetime</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Open</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Close</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>sma5</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>sma10</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>sma21</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>sma50</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {price_hists.map((row, index) => (
                                <TableRow key={`${row.ticker}-${row.datetime}`} sx={{
                                    backgroundColor: index % 2 === 0 ? 'white' : '#D6CFCF', height: "72px"
                                }}>
                                    <TableCell component="th" scope="row" sx={{color: '#AFA4A4'}}>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell align="left"
                                               sx={{color: '#AFA4A4'}}>{row.datetime.substring(0, 10)}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.open}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.close}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sma5}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sma10}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sma21}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sma50}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                    }}
                >
                    <Pagination
                        count={totalPriceHistPages}
                        page={currentPriceHistPage}
                        onChange={(event, newPage) => {
                            setCurrentPriceHistPage(newPage);
                        }}
                        color="primary"
                    />
                </Box>
            </div>
        </div>
    );
}

export default Analysis;
