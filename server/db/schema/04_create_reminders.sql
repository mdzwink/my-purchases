DROP TABLE IF EXISTS reminders CASCADE;

CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  receipt_id INTEGER REFERENCES receipts(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL
);