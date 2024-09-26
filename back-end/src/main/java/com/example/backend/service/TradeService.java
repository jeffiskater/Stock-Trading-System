package com.example.backend.service;

import com.example.backend.model.PriceHist;
import com.example.backend.model.Trade;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TradeService {

    public List<Trade> generateTrades(List<PriceHist> priceHists, LocalDateTime startDate, LocalDateTime endDate, String buySignal, String sellSignal) {
        List<Trade> trades = new ArrayList<>();
        BigDecimal initialAmount = new BigDecimal("10000.0"); // Initial amount
        BigDecimal cashBalance = initialAmount; // Starting cash balance
        BigDecimal shares = BigDecimal.ZERO; // No initial shares

        for (int i = 1; i < priceHists.size(); i++) {
            PriceHist currentDay = priceHists.get(i);
            PriceHist previousDay = priceHists.get(i - 1);

            BigDecimal stockBalance = shares.multiply(currentDay.getClose()); // Current stock value
            BigDecimal totalBalance = stockBalance.add(cashBalance); // Total balance = cash + stock

            // If a buy signal is triggered
            if (buySignalTriggered(previousDay, buySignal) && shares.equals(BigDecimal.ZERO)) {
                BigDecimal openPrice = currentDay.getOpen();
                shares = cashBalance.divide(openPrice, BigDecimal.ROUND_HALF_UP); // Buy stocks using all cash
                cashBalance = BigDecimal.ZERO; // All cash used

                trades.add(new Trade(
                        currentDay.getId().getTicker(),
                        currentDay.getId().getDatetime().toLocalDate(),
                        openPrice.doubleValue(),
                        "Buy",
                        stockBalance.doubleValue(),
                        cashBalance.doubleValue(),
                        totalBalance.doubleValue(),
                        shares.doubleValue()
                ));
            }
            // If a sell signal is triggered
            else if (sellSignalTriggered(previousDay, sellSignal) && shares.compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal openPrice = currentDay.getOpen();
                cashBalance = shares.multiply(openPrice); // Cash after selling
                stockBalance = BigDecimal.ZERO; // Sold all stock
                shares = BigDecimal.ZERO; // No shares left
                totalBalance = stockBalance.add(cashBalance); // Update total balance

                trades.add(new Trade(
                        currentDay.getId().getTicker(),
                        currentDay.getId().getDatetime().toLocalDate(),
                        openPrice.doubleValue(),
                        "Sell",
                        stockBalance.doubleValue(),
                        cashBalance.doubleValue(),
                        totalBalance.doubleValue(),
                        shares.doubleValue()
                ));
            } else {
                // No trade for the day, record "N/A"
                trades.add(new Trade(
                        currentDay.getId().getTicker(),
                        currentDay.getId().getDatetime().toLocalDate(),
                        currentDay.getClose().doubleValue(),
                        "N/A",
                        stockBalance.doubleValue(),
                        cashBalance.doubleValue(),
                        totalBalance.doubleValue(),
                        shares.doubleValue()
                ));
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
