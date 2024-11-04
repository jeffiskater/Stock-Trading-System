import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

// Simulated stock data for multiple companies
const stockDataList = {
    AAPL: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        currentPrice: 150.00,
        change: 2.5,
        changePercent: 1.7,
        peRatio: 25.67,
        marketCap: '2.4T',
        dividendYield: '0.60%',
        volume: 90000000,
        fiftyTwoWeekHigh: 180.00,
        fiftyTwoWeekLow: 120.00,
    },
    GOOGL: {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        currentPrice: 2800.00,
        change: -15.00,
        changePercent: -0.53,
        peRatio: 30.45,
        marketCap: '1.9T',
        dividendYield: '0%',
        volume: 1200000,
        fiftyTwoWeekHigh: 2900.00,
        fiftyTwoWeekLow: 2300.00,
    },
    MSFT: {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        currentPrice: 300.00,
        change: 5.00,
        changePercent: 1.7,
        peRatio: 35.30,
        marketCap: '2.1T',
        dividendYield: '0.80%',
        volume: 30000000,
        fiftyTwoWeekHigh: 350.00,
        fiftyTwoWeekLow: 240.00,
    },
    TSLA: {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        currentPrice: 750.00,
        change: -10.00,
        changePercent: -1.32,
        peRatio: 60.00,
        marketCap: '750B',
        dividendYield: '0%',
        volume: 50000000,
        fiftyTwoWeekHigh: 900.00,
        fiftyTwoWeekLow: 500.00,
    },
    AMZN: {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        currentPrice: 3400.00,
        change: 30.00,
        changePercent: 0.89,
        peRatio: 55.00,
        marketCap: '1.7T',
        dividendYield: '0%',
        volume: 4000000,
        fiftyTwoWeekHigh: 3500.00,
        fiftyTwoWeekLow: 2800.00,
    },
    FB: {
        symbol: 'FB',
        name: 'Meta Platforms Inc.',
        currentPrice: 350.00,
        change: 12.00,
        changePercent: 3.57,
        peRatio: 20.12,
        marketCap: '950B',
        dividendYield: '0%',
        volume: 18000000,
        fiftyTwoWeekHigh: 380.00,
        fiftyTwoWeekLow: 250.00,
    },
    NFLX: {
        symbol: 'NFLX',
        name: 'Netflix Inc.',
        currentPrice: 500.00,
        change: -5.00,
        changePercent: -1.00,
        peRatio: 40.00,
        marketCap: '220B',
        dividendYield: '0%',
        volume: 3000000,
        fiftyTwoWeekHigh: 600.00,
        fiftyTwoWeekLow: 400.00,
    },
    NVDA: {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        currentPrice: 800.00,
        change: 15.00,
        changePercent: 1.91,
        peRatio: 45.67,
        marketCap: '1.2T',
        dividendYield: '0.12%',
        volume: 15000000,
        fiftyTwoWeekHigh: 900.00,
        fiftyTwoWeekLow: 400.00,
    },
    INTC: {
        symbol: 'INTC',
        name: 'Intel Corporation',
        currentPrice: 50.00,
        change: -1.00,
        changePercent: -1.96,
        peRatio: 10.50,
        marketCap: '220B',
        dividendYield: '2.50%',
        volume: 35000000,
        fiftyTwoWeekHigh: 70.00,
        fiftyTwoWeekLow: 45.00,
    },
    CSCO: {
        symbol: 'CSCO',
        name: 'Cisco Systems Inc.',
        currentPrice: 55.00,
        change: -1.25,
        changePercent: -2.22,
        peRatio: 18.90,
        marketCap: '240B',
        dividendYield: '2.50%',
        volume: 20000000,
        fiftyTwoWeekHigh: 60.00,
        fiftyTwoWeekLow: 40.00,
    },
};

const Summary = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [chartData, setChartData] = useState({}); // Chart data state


    // Fetch current ticker and set corresponding stock data
    const fetchCurrentTicker = async () => {
        const storedTicker = localStorage.getItem('currentTicker');
        console.log(storedTicker);
        if (storedTicker) {
            setTicker(storedTicker);
            setStockData(stockDataList[storedTicker]); // Fetch stock data based on the ticker
            setChartData(generateChartData(storedTicker)); // Generate chart data for the stock
        }
    };

    // Generate line chart data
    const generateChartData = (ticker) => {
        const prices = [];
        const labels = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // Get date from 30 days ago

        // Simulate price data
        for (let i = 0; i < 30; i++) {
            labels.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString()); // Date labels
            prices.push(Math.random() * (200 - 100) + 100); // Random price generation
        }

        return {
            labels: labels,
            datasets: [
                {
                    label: `Price Trend - ${ticker}`,
                    data: prices,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        };
    };

    useEffect(() => {
        fetchCurrentTicker();
    }, []);

    if (!stockData) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {stockData.name} ({stockData.symbol})
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h6">
                    Current Price: ${stockData.currentPrice.toFixed(2)}
                    <span style={{ color: stockData.change > 0 ? 'green' : 'red', marginLeft: '10px' }}>
                        {stockData.change > 0 ? `+${stockData.change.toFixed(2)}` : stockData.change.toFixed(2)}
                        ({stockData.changePercent}%)
                    </span>
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                        <Typography variant="body1">P/E Ratio: {stockData.peRatio}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Market Cap: {stockData.marketCap}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Dividend Yield: {stockData.dividendYield}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid item xs={4}>
                        <Typography variant="body1">Volume: {stockData.volume.toLocaleString()}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">52 Week High: ${stockData.fiftyTwoWeekHigh}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">52 Week Low: ${stockData.fiftyTwoWeekLow}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h6" gutterBottom>
                Price Trend Over Last 30 Days
            </Typography>


            {/* Chart Paper */}
            <Paper elevation={3} sx={{ padding: 2 }}>
                {chartData.labels && (
                    <Line
                        data={{
                            ...chartData,
                            datasets: [{
                                ...chartData.datasets[0],
                                pointStyle: 'circle',
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                borderWidth: 2,
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return ` $${context.raw}`;
                                        }
                                    }
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                },
                            },
                        }}
                        height={300} // Set chart height
                    />
                )}
            </Paper>

        </Box>
    );
};

export default Summary;
