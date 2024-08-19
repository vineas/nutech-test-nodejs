CREATE TABLE members (
  member_id VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  balance NUMERIC DEFAULT 0
);

CREATE TABLE services (
  service_code VARCHAR PRIMARY KEY,
  service_name VARCHAR NOT NULL,
  service_icon TEXT,
  service_tariff NUMERIC NOT NULL
);

CREATE TABLE transactions (
  transaction_id VARCHAR PRIMARY KEY,
  invoice_number VARCHAR NOT NULL UNIQUE,
  service_name VARCHAR NOT NULL,
  transaction_type VARCHAR NOT NULL,
  total_amount NUMERIC NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  service_code VARCHAR REFERENCES services(service_code),
  member_id VARCHAR REFERENCES members(member_id)
);