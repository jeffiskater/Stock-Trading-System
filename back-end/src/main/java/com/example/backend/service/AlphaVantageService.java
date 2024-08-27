package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Service
public class AlphaVantageService {

    private static final String API_KEY = "RE5D3B43RL26I7AB";
    private static final String BASE_URL = "https://www.alphavantage.co/query";

    public Map<String, Map<String, BigDecimal>> getDailyTimeSeries(String symbol) throws Exception {
        String url = String.format("%s?function=TIME_SERIES_DAILY&symbol=%s&apikey=%s", BASE_URL, symbol, API_KEY);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        if (response == null) {
            throw new Exception("Failed to fetch data from Alpha Vantage");
        }


        JSONObject json = new JSONObject(response);

        if (!json.has("Time Series (Daily)")) {
            throw new Exception("Time Series data not available for the given symbol");
        }

        JSONObject timeSeries = json.getJSONObject("Time Series (Daily)");

        Map<String, Map<String, BigDecimal>> dailyPrices = new HashMap<>();


        Iterator<String> keys = timeSeries.keys();
        while (keys.hasNext()) {
            String date = keys.next();
            JSONObject dailyData = timeSeries.getJSONObject(date);
            Map<String, BigDecimal> dataMap = new HashMap<>();
            dataMap.put("open", new BigDecimal(dailyData.getString("1. open")));
            dataMap.put("high", new BigDecimal(dailyData.getString("2. high")));
            dataMap.put("low", new BigDecimal(dailyData.getString("3. low")));
            dataMap.put("close", new BigDecimal(dailyData.getString("4. close")));
            dataMap.put("volume", new BigDecimal(dailyData.getString("5. volume")));
            dailyPrices.put(date, dataMap);
        }

        return dailyPrices;
    }
}
