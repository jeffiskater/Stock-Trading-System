package com.example.backend.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Embeddable
public class PriceHistId implements Serializable {

    private String ticker;
    private LocalDateTime datetime;

    public PriceHistId() {}

    public PriceHistId(String ticker, LocalDateTime datetime) {
        this.ticker = ticker;
        this.datetime = datetime;
    }

    // Getters, Setters, hashCode and equals methods
    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PriceHistId that = (PriceHistId) o;
        return Objects.equals(ticker, that.ticker) && Objects.equals(datetime, that.datetime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ticker, datetime);
    }
}
