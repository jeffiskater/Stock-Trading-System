package main.java.com.stocksystem;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

public class StockDataFetcher {
    private static final String API_KEY = "RE5D3B43RL26I7AB";

    public static BigDecimal getLatestStockPrice(String symbol) throws Exception {
        String urlString = String.format(
                "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&apikey=%s", symbol, API_KEY);
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        JSONObject json = new JSONObject(content.toString());
        JSONObject timeSeries = json.getJSONObject("Time Series (Daily)");
        JSONObject latestData = timeSeries.getJSONObject(timeSeries.keys().next());

        return latestData.getBigDecimal("4. close");
    }

    public static Map<String, Map<String, BigDecimal>> getDailyTimeSeries(String symbol) throws Exception {
        String urlString = String.format("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=%s&apikey=%s", symbol, API_KEY);
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        JSONObject json = new JSONObject(content.toString());
        JSONObject timeSeries = json.getJSONObject("Time Series (Daily)");

        Map<String, Map<String, BigDecimal>> dailyPrices = new HashMap<>();
        for (String date : timeSeries.keySet()) {
            JSONObject dailyData = timeSeries.getJSONObject(date);
            Map<String, BigDecimal> dataMap = new HashMap<>();
            dataMap.put("open", dailyData.getBigDecimal("1. open"));
            dataMap.put("high", dailyData.getBigDecimal("2. high"));
            dataMap.put("low", dailyData.getBigDecimal("3. low"));
            dataMap.put("close", dailyData.getBigDecimal("4. close"));
            dataMap.put("volume", dailyData.getBigDecimal("5. volume"));
            dailyPrices.put(date, dataMap);
        }

        return dailyPrices;
    }
}

