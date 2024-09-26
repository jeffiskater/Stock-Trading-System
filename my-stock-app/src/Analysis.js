import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
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
    Paper,
    Pagination,
    IconButton,
    Checkbox,
    Link,
    Breadcrumbs,
    Container,
    Toolbar,
    AppBar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    DialogTitle, Dialog
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';


function Analysis() {

    const {ticker} = useParams();
    const [priceHists, setPriceHists] = useState([]);


    const [totalPriceHistPages, setTotalPriceHistPages] = useState(0);
    const [currentPriceHistPage, setCurrentPriceHistPage] = useState(1);
    const rowsPerPagePriceHist = 10;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [buySignal, setBuySignal] = useState('sma5');
    const [sellSignal, setSellSignal] = useState('sma5');

    const [tradeForm, setTradeForm] = useState(false);
    const [trade, setTrades] = useState([]);
    const handleTradeFormClose = () => {
        setTradeForm(false)
    };


    const trade_list = trade.map((trade) => ({
        ticker: trade.ticker,
        tradeDate: trade.tradeDate,
        price: trade.price,
        tradeType: trade.tradeType,
        stockBalance: trade.stockBalance,
        cashBalance: trade.cashBalance,
        totalBalance: trade.totalBalance,
        shares: trade.shares
    }));


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

    const smaAnalysis = async () => {
        if (!startDate || !endDate) {
            console.error("Start Date and End Date are required.");
            return;
        }

        const formattedStartDate = startDate.toISOString().replace(/\.\d+Z$/, '');
        ;
        const formattedEndDate = endDate.toISOString().replace(/\.\d+Z$/, '');
        ;

        try {
            const url = `/api/trades?ticker=${ticker}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&buySignal=${buySignal}&sellSignal=${sellSignal}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const tradesData = await response.json();
            setTrades(tradesData)
            setTradeForm(true)

            console.log('Fetched trades data:', tradesData);
        } catch (error) {
            console.error('Error fetching trades:', error);
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
                <Box my={4} ml={20}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            sx={{marginLeft: "6px"}}
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <FormControl sx={{minWidth: 120, marginLeft: "6px"}}>
                        <InputLabel id="buy-signal-label">Buy Signal</InputLabel>
                        <Select
                            labelId="buy-signal-label"
                            value={buySignal}
                            onChange={(e) => setBuySignal(e.target.value)}
                            label="Buy Signal"
                        >
                            <MenuItem value="sma5">SMA 5</MenuItem>
                            <MenuItem value="sma10">SMA 10</MenuItem>
                            <MenuItem value="sma21">SMA 21</MenuItem>
                            <MenuItem value="sma50">SMA 50</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{minWidth: 120, marginLeft: "6px"}}>
                        <InputLabel id="sell-signal-label">Sell Signal</InputLabel>
                        <Select
                            labelId="sell-signal-label"
                            value={sellSignal}
                            onChange={(e) => setSellSignal(e.target.value)}
                            label="Sell Signal"
                        >
                            <MenuItem value="sma5">SMA 5</MenuItem>
                            <MenuItem value="sma10">SMA 10</MenuItem>
                            <MenuItem value="sma21">SMA 21</MenuItem>
                            <MenuItem value="sma50">SMA 50</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={smaAnalysis}
                        sx={{
                            backgroundColor: '#AFA4A4',
                            color: 'white',
                            borderRadius: '20px',
                            ml: 8,
                            mt: 1,
                            '&:hover': {
                                backgroundColor: '#9e9e9e'
                            }
                        }}
                    >
                        Analysis
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{maxWidth: 2200, minHeight: 784, margin: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#AFA4A4', height: "70px"}}>
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

            <Dialog open={tradeForm} onClose={handleTradeFormClose}
                    PaperProps={{
                        sx: {
                            width: '1200px',
                            height: '800px',
                            maxWidth: 'none'
                        }
                    }}>
                <DialogTitle>Trade Balance</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleTradeFormClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon></CloseIcon>
                </IconButton>
                <Box
                    sx={{
                        my: 2,
                        ml: 2
                    }}>
                </Box>
                <TableContainer component={Paper} sx={{maxWidth: 1000, ml: 10}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#AFA4A4'}}>
                                <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Ticker</TableCell>
                                <TableCell align="left" sx={{color: 'white', fontWeight: 'bold'}}>tradeDate</TableCell>
                                <TableCell align="left" sx={{color: 'white', fontWeight: 'bold'}}>trade
                                    type</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>price</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>stock balance</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>cash balance</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>total balance</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>shares</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trade_list.map((row, index) => (
                                <TableRow key={`${row.ticker}-${row.tradeDate}`} sx={{
                                    backgroundColor: index % 2 === 0 ? 'white' : '#D6CFCF',
                                }}>
                                    <TableCell component="th" scope="row" sx={{color: '#AFA4A4'}}>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell align="left"
                                               sx={{color: '#AFA4A4'}}>{row.tradeDate}</TableCell>
                                    <TableCell align="left" sx={{color: '#AFA4A4'}}>{row.tradeType}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.price}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.stockBalance}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.cashBalance}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.totalBalance}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.shares}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        justifyContent: 'center',*/}
                {/*        mt: 2,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Pagination*/}
                {/*        count={totalPriceHistPages}*/}
                {/*        page={currentPriceHistPage}*/}
                {/*        onChange={(event, newPage) => {*/}
                {/*            setCurrentPriceHistPage(newPage);*/}
                {/*            fetchPriceHist(ticker, newPage, rowsPerPagePriceHist);*/}
                {/*        }}*/}
                {/*        color="primary"*/}
                {/*    />*/}
                {/*</Box>*/}
            </Dialog>
        </div>
    );
}

export default Analysis;
