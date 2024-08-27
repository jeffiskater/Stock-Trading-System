package com.example.backend.controller;

import com.example.backend.model.PriceHist;
import com.example.backend.service.PriceHistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/priceHists")
public class PriceHistController {

    @Autowired
    private PriceHistService priceHistService;

    @GetMapping("/{ticker}")
    public Page<PriceHist> getPriceHistsByTicker(@PathVariable String ticker,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("id.datetime")));
        return priceHistService.getPriceHistsByTicker(ticker, pageable);
    }

    @PostMapping("/fetch/{ticker}")
    public void fetchAndStorePriceHists(@PathVariable String ticker) {
        try {
            priceHistService.fetchAndStorePriceHist(ticker);
            priceHistService.calculateAndStoreSMA(ticker, 5);
            priceHistService.calculateAndStoreSMA(ticker, 10);
            priceHistService.calculateAndStoreSMA(ticker, 21);
            priceHistService.calculateAndStoreSMA(ticker, 50);
            priceHistService.calculateAndStoreSMA(ticker, 100);
            priceHistService.calculateAndStoreSMA(ticker, 200);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}