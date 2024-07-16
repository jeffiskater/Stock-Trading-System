package main.java.com.stocksystem;

import java.math.BigDecimal;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
//        String symbol = "AAPL";
//        String name = "Apple Inc.";
//        String sector = "Technology";
//        String industry = "Consumer Electronics";

        String symbol = "NVDA";
        String name = "NVIDIA Corporation";
        String sector = "Technology";
        String industry = "Semiconductors";

        try {
            // Get latest stock price from Alpha Vantage
            BigDecimal latestPrice = StockDataFetcher.getLatestStockPrice(symbol);

            // Insert stock data into the database
            DatabaseManager.insertStockData(symbol, name, sector, industry, latestPrice);

            // Get daily time series data from Alpha Vantage
            Map<String, Map<String, BigDecimal>> dailyPrices = StockDataFetcher.getDailyTimeSeries(symbol);

            // Insert price history into the database
            DatabaseManager.insertPriceHistoryBatch(symbol, dailyPrices);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
