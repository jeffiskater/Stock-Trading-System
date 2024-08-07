package com.example.backend.service;

import com.example.backend.model.PriceHist;
import com.example.backend.repository.PriceHistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceHistService {

    @Autowired
    private PriceHistRepository priceHistRepository;

    public List<PriceHist> getPriceHistsByTicker(String ticker) {
        return priceHistRepository.findById_Ticker(ticker);
    }
}
