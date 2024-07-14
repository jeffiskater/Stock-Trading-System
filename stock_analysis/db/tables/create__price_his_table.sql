-- Create stock table
CREATE TABLE price_hist
(
    ticker   VARCHAR(75),
    datetime DATETIME,
    price    DECIMAL(12, 6),
    PRIMARY KEY (ticker, datetime),
    FOREIGN KEY (ticker) REFERENCES stock (ticker)
);