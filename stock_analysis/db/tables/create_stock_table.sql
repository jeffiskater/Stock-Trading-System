-- Create stock table
CREATE TABLE stock (
    ticker VARCHAR(75) PRIMARY KEY,
    name VARCHAR(255),
    sector_nm VARCHAR(100),
    industry_nm VARCHAR(100),
    price DECIMAL(12, 6)
);