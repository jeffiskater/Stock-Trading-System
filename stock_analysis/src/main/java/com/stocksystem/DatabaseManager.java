package main.java.com.stocksystem;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.Map;

public class DatabaseManager {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/stock_analysis";
    private static final String USER = "root";
    private static final String PASS = "123456";

    public static void insertStockData(String symbol, String name, String sector, String industry, BigDecimal price) {
        String insertSQL = "INSERT INTO stock (ticker, name, sector_nm, industry_nm, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE price = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {

            pstmt.setString(1, symbol);
            pstmt.setString(2, name);
            pstmt.setString(3, sector);
            pstmt.setString(4, industry);
            pstmt.setBigDecimal(5, price);
            pstmt.setBigDecimal(6, price);
            pstmt.executeUpdate();

            System.out.println("Stock data inserted successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void insertPriceHistoryBatch(String symbol, Map<String, Map<String, BigDecimal>> dailyPrices) {
        String insertSQL = "INSERT INTO price_hist (ticker, datetime, open, high, low, close, volume) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE open = ?, high = ?, low = ?, close = ?, volume = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {

            for (Map.Entry<String, Map<String, BigDecimal>> entry : dailyPrices.entrySet()) {
                String dateStr = entry.getKey();
                Map<String, BigDecimal> dataMap = entry.getValue();
                Timestamp datetime = Timestamp.valueOf(dateStr + " 00:00:00");

                pstmt.setString(1, symbol);
                pstmt.setTimestamp(2, datetime);
                pstmt.setBigDecimal(3, dataMap.get("open"));
                pstmt.setBigDecimal(4, dataMap.get("high"));
                pstmt.setBigDecimal(5, dataMap.get("low"));
                pstmt.setBigDecimal(6, dataMap.get("close"));
                pstmt.setBigDecimal(7, dataMap.get("volume"));
                pstmt.setBigDecimal(8, dataMap.get("open"));
                pstmt.setBigDecimal(9, dataMap.get("high"));
                pstmt.setBigDecimal(10, dataMap.get("low"));
                pstmt.setBigDecimal(11, dataMap.get("close"));
                pstmt.setBigDecimal(12, dataMap.get("volume"));
                pstmt.addBatch();
            }

            pstmt.executeBatch();
            System.out.println("Batch price history inserted successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
