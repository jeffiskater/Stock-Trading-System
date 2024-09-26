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
    private String tradeType; // "Buy", "Sell" or "N/A"
    private double stockBalance; // Current stock value
    private double cashBalance;  // Current cash balance
    private double totalBalance; // Total balance = stockBalance + cashBalance
    private double shares;

    // Default constructor
    public Trade() {}

    // Constructor with parameters
    public Trade(String ticker, LocalDate tradeDate, double price, String tradeType, double stockBalance, double cashBalance, double totalBalance, double shares) {
        this.ticker = ticker;
        this.tradeDate = tradeDate;
        this.price = price;
        this.tradeType = tradeType;
        this.stockBalance = stockBalance;
        this.cashBalance = cashBalance;
        this.totalBalance = totalBalance;
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

    public double getStockBalance() {
        return stockBalance;
    }

    public void setStockBalance(double stockBalance) {
        this.stockBalance = stockBalance;
    }

    public double getCashBalance() {
        return cashBalance;
    }

    public void setCashBalance(double cashBalance) {
        this.cashBalance = cashBalance;
    }

    public double getTotalBalance() {
        return totalBalance;
    }

    public void setTotalBalance(double totalBalance) {
        this.totalBalance = totalBalance;
    }

    public double getShares() {
        return shares;
    }

    public void setShares(double shares) {
        this.shares = shares;
    }
}
