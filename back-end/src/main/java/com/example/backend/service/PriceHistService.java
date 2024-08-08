package com.example.backend.service;

import com.example.backend.model.PriceHist;
import com.example.backend.model.PriceHistId;
import com.example.backend.repository.PriceHistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
}
