package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import java.math.BigDecimal;

@Entity
public class Stock {

    @Id
    private String ticker;

    @Column(name = "name")
    private String name;

    @Column(name = "sector_nm")
    private String sectorNm;

    @Column(name = "industry_nm")
    private String industryNm;

    @Column(name = "price")
    private BigDecimal price;

    // Getters and Setters

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSectorNm() {
        return sectorNm;
    }

    public void setSectorNm(String sectorNm) {
        this.sectorNm = sectorNm;
    }

    public String getIndustryNm() {
        return industryNm;
    }

    public void setIndustryNm(String industryNm) {
        this.industryNm = industryNm;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
