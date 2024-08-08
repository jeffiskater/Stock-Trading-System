import React, {useState, useEffect} from 'react';
import {
    TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Pagination, IconButton, Checkbox, Link, Breadcrumbs, Container, Toolbar, AppBar, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Stock() {

    const [stocks, setStocks] = useState([]);
    const [priceHists, setPriceHists] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const [totalPriceHistPages, setTotalPriceHistPages] = useState(0);
    const [currentPriceHistPage, setCurrentPriceHistPage] = useState(1);
    const rowsPerPagePriceHist = 10;

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        fetchStocks();
    }, [searchQuery, page]);

    const fetchStocks = async () => {
        try {
            let url;

            if (ticker) {
                url = `/api/stocks/${ticker}`;
            } else {
                url = `/api/stocks?page=${page - 1}&size=${rowsPerPage}&name=${searchQuery}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();

                if (ticker) {
                    setStocks([data]);
                } else {
                    setStocks(data.content || []);
                    setTotalPages(data.totalPages || 0);
                }

                console.log('Fetched stocks:', data);
            } else {
                const text = await response.text();
                console.error('Expected JSON but received:', text);
            }
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };



    const fetchPriceHist = async (ticker, page = 1, size = 10) => {
        try {
            const url = `/api/priceHists/${ticker}?page=${page - 1}&size=${size}&sort=datetime,desc`;
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
            Stock
        </Link>,
    ];
    const [ticker, setTicker] = useState('');


    const handleSearch = () => {
        setSearchQuery(ticker);
    };


    const createData = (ticker, name, sectorNm, price) => {
        return {ticker, name, sectorNm, price};
    };


    const rows = stocks.map(stock => createData(stock.ticker, stock.name, stock.sectorNm, stock.price));

    const [price_hist, setPrice_hist] = useState({
        ticker: '',
        datetime: '',
        open: '',
        high: '',
        low: '',
        close: '',
        volume: ''
    });

    const price_hists = priceHists.map((hist) => ({
        ticker: hist.id.ticker,
        datetime: hist.id.datetime,
        open: hist.open,
        high: hist.high,
        low: hist.low,
        close: hist.close,
        volume: hist.volume,
    }));


    const [open, setOpen] = useState(false);
    const [newStock, setNewStock] = useState({ticker: '', name: '', sectorNm: '', price: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [price_hist_form, setPrice_hist_form] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddStockChange = (e) => {
        const {name, value} = e.target;
        setNewStock((prevStock) => ({
            ...prevStock,
            [name]: value,
        }));
    };

    const handleAddStockSubmit = async () => {
        try {
            const response = await fetch(`/api/stocks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStock),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchStocks();
            setNewStock({ticker: '', name: '', sectorNm: '', price: ''});
            setEditStock(null);
            setOpen(false);
        } catch (error) {
            console.error(`Error ${editStock ? 'updating' : 'adding'} stock:`, error);
        }
    };


    const [editStock, setEditStock] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);

    const handleClosePriceHistForm = () => {
        setPrice_hist_form(false);
    };

    const handlePriceHistFormOpen = (stock) => {
        setTicker(stock.ticker);  // Store the ticker
        fetchPriceHist(stock.ticker);  // Fetch the price history for the selected ticker
        setPrice_hist_form(true);
    };


    const handlePriceHistFormClose = () => {
        setPrice_hist_form(false);
        setPriceHists([]);
    };


    const handleEditClick = (stock) => {
        setEditStock(stock);
        setNewStock(stock);
        setOpen(true);
    };

    const handleDeleteClick = async (ticker) => {
        try {
            const response = await fetch(`/api/stocks/${ticker}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchStocks(); // Refresh the stocks list
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewStock({ticker: '', name: '', sectorNm: '', price: ''}); // Reset form
        setEditStock(null);
    };


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
                        startIcon={<SearchIcon/>}
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
                        onClick={handleClickOpen}
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
                                <TableCell padding="checkbox">
                                    <Checkbox sx={{color: 'white'}}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.ticker}>
                                    <TableCell component="th" scope="row" sx={{color: '#AFA4A4'}}>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.name}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.sectorNm}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.price}</TableCell>
                                    <TableCell align="right">
                                        <Link onClick={() => handlePriceHistFormOpen(row)}>Price history </Link>
                                        <IconButton aria-label="edit" color="primary"
                                                    onClick={() => handleEditClick(row)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="delete" color="secondary"
                                                    onClick={() => handleDeleteClick(row.ticker)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox/>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    sx={{
                        mt: 4,
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, newPage) => setPage(newPage)}
                        color="primary"
                    />
                </Box>
            </Container>
            <Dialog open={open} onClose={handleDialogClose}
                    PaperProps={{
                        sx: {
                            width: '400px',
                            height: '500px',
                            maxWidth: 'none'
                        }
                    }}>
                <DialogTitle>{editStock ? 'Edit stock' : 'Add a new stock'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ticker"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="ticker"
                        value={newStock.ticker}
                        onChange={handleAddStockChange}
                        disabled={!!editStock} // Disable ticker field when editing
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        value={newStock.name}
                        onChange={handleAddStockChange}
                    />
                    <TextField
                        margin="dense"
                        label="Sector"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="sectorNm"
                        value={newStock.sectorNm}
                        onChange={handleAddStockChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        name="price"
                        value={newStock.price}
                        onChange={handleAddStockChange}
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '80%',
                            maxWidth: '400px',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddStockSubmit}
                            sx={{
                                width: '100%',
                                backgroundColor: '#AFA4A4',
                                color: 'white',
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: '#9e9e9e'
                                }
                            }}
                        >
                            {editStock ? 'Update' : 'Submit'}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Dialog open={price_hist_form} onClose={handlePriceHistFormClose}
                    PaperProps={{
                        sx: {
                            width: '1200px',
                            height: '800px',
                            maxWidth: 'none'
                        }
                    }}>
                <DialogTitle>Price history</DialogTitle>
                <TableContainer component={Paper} sx={{maxWidth: 1000,ml:10}}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#AFA4A4'}}>
                                <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Ticker</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Datetime</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Open</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>High</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Low</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Close</TableCell>
                                <TableCell align="right" sx={{color: 'white', fontWeight: 'bold'}}>Volume</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {price_hists.map((row) => (
                                <TableRow key={`${row.ticker}-${row.datetime}`}>
                                    <TableCell component="th" scope="row" sx={{color: '#AFA4A4'}}>
                                        {row.ticker}
                                    </TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.datetime}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.open}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.high}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.low}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.close}</TableCell>
                                    <TableCell align="right" sx={{color: '#AFA4A4'}}>{row.volume}</TableCell>
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
                            fetchPriceHist(ticker, newPage, rowsPerPagePriceHist); // Pass ticker correctly here
                        }}
                        color="primary"
                    />
                </Box>
            </Dialog>
        </div>
    );
}

export default Stock;
