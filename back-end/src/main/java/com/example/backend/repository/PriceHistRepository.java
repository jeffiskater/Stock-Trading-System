package com.example.backend.repository;

import com.example.backend.model.PriceHist;
import com.example.backend.model.PriceHistId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceHistRepository extends JpaRepository<PriceHist, PriceHistId> {
    List<PriceHist> findById_Ticker(String ticker);
}
