package com.example.backend.controller;

// TradeController.java
import com.example.backend.model.PriceHist;
import com.example.backend.model.Trade;
import com.example.backend.service.PriceHistService;
import com.example.backend.service.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    @Autowired
    private TradeService tradeService;

    @Autowired
    private PriceHistService priceHistService; // 获取历史价格数据的服务

    @GetMapping
    public List<Trade> getTrades(@RequestParam String ticker, @RequestParam String startDate, @RequestParam String endDate,
                                 @RequestParam String buySignal, @RequestParam String sellSignal) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<PriceHist> priceHists = priceHistService.getPriceHist(ticker, start, end); // 获取指定时间范围内的价格历史
        return tradeService.generateTrades(priceHists, start, end, buySignal, sellSignal);
    }
}
