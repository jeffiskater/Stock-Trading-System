package com.example.backend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.math.BigDecimal;

@Entity
@Table(name = "price_hist")
public class PriceHist {

    @EmbeddedId
    private PriceHistId id;

    @Column(name = "open")
    private BigDecimal open;

    @Column(name = "high")
    private BigDecimal high;

    @Column(name = "low")
    private BigDecimal low;

    @Column(name = "close")
    private BigDecimal close;

    @Column(name = "volume")
    private BigDecimal volume;

    @Column(name = "sma5")
    private BigDecimal sma5;

    @Column(name = "sma10")
    private BigDecimal sma10;

    @Column(name = "sma21")
    private BigDecimal sma21;

    @Column(name = "sma50")
    private BigDecimal sma50;

    @Column(name = "sma100")
    private BigDecimal sma100;

    @Column(name = "sma200")
    private BigDecimal sma200;

    public PriceHist() {
    }

    // Getters and Setters
    public PriceHistId getId() {
        return id;
    }

    public void setId(PriceHistId id) {
        this.id = id;
    }

    public BigDecimal getOpen() {
        return open;
    }

    public void setOpen(BigDecimal open) {
        this.open = open;
    }

    public BigDecimal getHigh() {
        return high;
    }

    public void setHigh(BigDecimal high) {
        this.high = high;
    }

    public BigDecimal getLow() {
        return low;
    }

    public void setLow(BigDecimal low) {
        this.low = low;
    }

    public BigDecimal getClose() {
        return close;
    }

    public void setClose(BigDecimal close) {
        this.close = close;
    }

    public BigDecimal getVolume() {
        return volume;
    }

    public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

    public BigDecimal getSma5() {
        return sma5;
    }

    public void setSma5(BigDecimal sma5) {
        this.sma5 = sma5;
    }

    public BigDecimal getSma10() {
        return sma10;
    }

    public void setSma10(BigDecimal sma10) {
        this.sma10 = sma10;
    }

    public BigDecimal getSma21() {
        return sma21;
    }

    public void setSma21(BigDecimal sma21) {
        this.sma21 = sma21;
    }

    public BigDecimal getSma50() {
        return sma50;
    }

    public void setSma50(BigDecimal sma50) {
        this.sma50 = sma50;
    }

    public BigDecimal getSma100() {
        return sma100;
    }

    public void setSma100(BigDecimal sma100) {
        this.sma100 = sma100;
    }

    public BigDecimal getSma200() {
        return sma200;
    }

    public void setSma200(BigDecimal sma200) {
        this.sma200 = sma200;
    }
}
