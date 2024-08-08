package com.example.backend.repository;

import com.example.backend.model.PriceHist;
import com.example.backend.model.PriceHistId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceHistRepository extends JpaRepository<PriceHist, PriceHistId> {
    Page<PriceHist> findById_Ticker(String ticker, Pageable pageable);
}


