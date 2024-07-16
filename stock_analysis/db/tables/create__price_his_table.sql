-- Create stock table
CREATE TABLE price_hist
(
    ticker     VARCHAR(75),
    datetime   DATETIME,
    open       DECIMAL(12, 6),
    high       DECIMAL(12, 6),
    low        DECIMAL(12, 6),
    close      DECIMAL(12, 6),
    volume     BIGINT,
    PRIMARY KEY (ticker, datetime),
    FOREIGN KEY (ticker) REFERENCES stock (ticker)
);
