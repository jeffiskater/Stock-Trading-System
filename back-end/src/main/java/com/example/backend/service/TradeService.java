package com.example.backend.service;

// TradeService.java

import com.example.backend.model.PriceHist;
import com.example.backend.model.Trade;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TradeService {

    public List<Trade> generateTrades(List<PriceHist> priceHists, LocalDateTime startDate, LocalDateTime endDate, String buySignal, String sellSignal) {
        List<Trade> trades = new ArrayList<>();
        BigDecimal initialAmount = new BigDecimal("10000.0"); // Initial amount
        BigDecimal balance = initialAmount;
        BigDecimal shares = BigDecimal.ZERO;

        for (int i = 1; i < priceHists.size(); i++) {
            PriceHist currentDay = priceHists.get(i);
            PriceHist previousDay = priceHists.get(i - 1);

            // Compare previous day's SMA and today's closing price to determine signal
            if (buySignalTriggered(previousDay, buySignal) && shares.equals(BigDecimal.ZERO)) {
                BigDecimal openPrice = currentDay.getOpen();
                shares = balance.divide(openPrice, BigDecimal.ROUND_HALF_UP); // Use opening price to buy stocks
                trades.add(new Trade(
                        currentDay.getId().getTicker(),
                        currentDay.getId().getDatetime().toLocalDate(),
                        openPrice.doubleValue(),
                        "Buy",
                        balance.doubleValue(),
                        shares.doubleValue()
                ));
                balance = BigDecimal.ZERO; // Use all funds to buy stocks
            } else if (sellSignalTriggered(previousDay, sellSignal) && shares.compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal openPrice = currentDay.getOpen();
                balance = shares.multiply(openPrice); // Account balance after selling
                trades.add(new Trade(
                        currentDay.getId().getTicker(),
                        currentDay.getId().getDatetime().toLocalDate(),
                        openPrice.doubleValue(),
                        "Sell",
                        balance.doubleValue(),
                        shares.doubleValue()
                ));
                shares = BigDecimal.ZERO; // Clear shares
            }
        }

        return trades;
    }

    // Determine if a buy signal is triggered
    private boolean buySignalTriggered(PriceHist priceHist, String buySignal) {
        BigDecimal closingPrice = priceHist.getClose();
        BigDecimal smaValue = getSmaValue(priceHist, buySignal);
        return closingPrice.compareTo(smaValue) > 0;
    }

    // Determine if a sell signal is triggered
    private boolean sellSignalTriggered(PriceHist priceHist, String sellSignal) {
        BigDecimal closingPrice = priceHist.getClose();
        BigDecimal smaValue = getSmaValue(priceHist, sellSignal);
        return closingPrice.compareTo(smaValue) < 0;
    }

    // Get SMA value based on the signal type
    private BigDecimal getSmaValue(PriceHist priceHist, String signal) {
        switch (signal) {
            case "sma5":
                return priceHist.getSma5();
            case "sma10":
                return priceHist.getSma10();
            case "sma21":
                return priceHist.getSma21();
            case "sma50":
                return priceHist.getSma50();
            case "sma100":
                return priceHist.getSma100();
            case "sma200":
                return priceHist.getSma200();
            default:
                throw new IllegalArgumentException("Unknown SMA signal: " + signal);
        }
    }
}
