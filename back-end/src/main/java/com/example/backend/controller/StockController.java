package com.example.backend.controller;

import com.example.backend.model.Stock;
import com.example.backend.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping
    public Page<Stock> getAllStocks(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return stockService.getAllStocks(pageable);
    }

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable String id) {
        return stockService.getStockById(id);
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockService.saveStock(stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable String id) {
        stockService.deleteStock(id);
    }
}
