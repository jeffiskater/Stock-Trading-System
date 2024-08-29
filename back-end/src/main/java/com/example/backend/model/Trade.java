package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;
    private LocalDate tradeDate;
    private double price;
    private String tradeType; // "Buy" or "Sell"
    private double tradeAmt;
    private double shares;

    // Default constructor
    public Trade() {}

    // Constructor with parameters
    public Trade(String ticker, LocalDate tradeDate, double price, String tradeType, double tradeAmt, double shares) {
        this.ticker = ticker;
        this.tradeDate = tradeDate;
        this.price = price;
        this.tradeType = tradeType;
        this.tradeAmt = tradeAmt;
        this.shares = shares;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public LocalDate getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(LocalDate tradeDate) {
        this.tradeDate = tradeDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getTradeType() {
        return tradeType;
    }

    public void setTradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public double getTradeAmt() {
        return tradeAmt;
    }

    public void setTradeAmt(double tradeAmt) {
        this.tradeAmt = tradeAmt;
    }

    public double getShares() {
        return shares;
    }

    public void setShares(double shares) {
        this.shares = shares;
    }
}
