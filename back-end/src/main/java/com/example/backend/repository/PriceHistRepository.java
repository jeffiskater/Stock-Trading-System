package com.example.backend.repository;

import com.example.backend.model.PriceHist;
import com.example.backend.model.PriceHistId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PriceHistRepository extends JpaRepository<PriceHist, PriceHistId> {
    Page<PriceHist> findById_Ticker(String ticker, Pageable pageable);

    List<PriceHist> findById_Ticker(String ticker, Sort sort);

    List<PriceHist> findByIdTickerAndIdDatetimeBetween(String ticker, LocalDateTime startDateTime, LocalDateTime endDateTime);

}



