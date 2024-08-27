package com.example.backend.service;

import com.example.backend.model.PriceHist;
import com.example.backend.model.PriceHistId;
import com.example.backend.repository.PriceHistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class PriceHistService {

    @Autowired
    private PriceHistRepository priceHistRepository;

    @Autowired
    private AlphaVantageService alphaVantageService;

    public Page<PriceHist> getPriceHistsByTicker(String ticker, Pageable pageable) {
        return priceHistRepository.findById_Ticker(ticker, pageable);
    }

    public void fetchAndStorePriceHist(String ticker) throws Exception {
        Map<String, Map<String, BigDecimal>> dailyPrices = alphaVantageService.getDailyTimeSeries(ticker);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map.Entry<String, Map<String, BigDecimal>> entry : dailyPrices.entrySet()) {
            String dateStr = entry.getKey();

            LocalDate date = LocalDate.parse(dateStr, formatter);
            LocalDateTime datetime = date.atStartOfDay();

            Map<String, BigDecimal> dataMap = entry.getValue();
            PriceHist priceHist = new PriceHist();
            PriceHistId id = new PriceHistId(ticker, datetime);
            priceHist.setId(id);
            priceHist.setOpen(dataMap.get("open"));
            priceHist.setHigh(dataMap.get("high"));
            priceHist.setLow(dataMap.get("low"));
            priceHist.setClose(dataMap.get("close"));
            priceHist.setVolume(dataMap.get("volume"));


            if (!priceHistRepository.existsById(id)) {
                priceHistRepository.save(priceHist);
            }
        }
    }

    //calculate SMA
    public void calculateAndStoreSMA(String ticker, int windowSize) {
        // 1. Fetch historical price data for the given ticker
        List<PriceHist> priceHists = priceHistRepository.findById_Ticker(ticker, Sort.by(Sort.Order.asc("id.datetime")));

        // Check if there are enough data points to calculate SMA
        if (priceHists.size() < windowSize) {
            throw new IllegalArgumentException("Not enough data to calculate SMA.");
        }

        // 2. Calculate SMA
        for (int i = windowSize - 1; i < priceHists.size(); i++) {
            BigDecimal sum = BigDecimal.ZERO;

            // Calculate the sum for the current window
            for (int j = i - windowSize + 1; j <= i; j++) {
                sum = sum.add(priceHists.get(j).getClose());
            }

            // Calculate the SMA value
            BigDecimal sma = sum.divide(BigDecimal.valueOf(windowSize), BigDecimal.ROUND_HALF_UP);

            // Get the current PriceHist object to update it with the SMA value
            PriceHist currentPriceHist = priceHists.get(i);
            switch (windowSize) {
                case 5:
                    currentPriceHist.setSma5(sma);
                    break;
                case 10:
                    currentPriceHist.setSma10(sma);
                    break;
                case 21:
                    currentPriceHist.setSma21(sma);
                    break;
                case 50:
                    currentPriceHist.setSma50(sma);
                    break;
                case 100:
                    currentPriceHist.setSma100(sma);
                    break;
                case 200:
                    currentPriceHist.setSma200(sma);
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported window size for SMA.");
            }

            // Save the updated PriceHist record
            priceHistRepository.save(currentPriceHist);
        }
    }
}
