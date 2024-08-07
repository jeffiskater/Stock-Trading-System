package com.example.backend.controller;

import com.example.backend.model.PriceHist;
import com.example.backend.service.PriceHistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/priceHists")
public class PriceHistController {

    @Autowired
    private PriceHistService priceHistService;

    @GetMapping("/{ticker}")
    public List<PriceHist> getPriceHistsByTicker(@PathVariable String ticker) {
        return priceHistService.getPriceHistsByTicker(ticker);
    }
}
