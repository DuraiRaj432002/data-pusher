-- Table: accounts
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  secret TEXT NOT NULL,
  website TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Trigger: update updatedAt on UPDATE for accounts
CREATE TRIGGER IF NOT EXISTS trg_accounts_updated
AFTER UPDATE ON accounts
FOR EACH ROW
BEGIN
  UPDATE accounts SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Table: destinations
CREATE TABLE IF NOT EXISTS destinations (
  id INTEGER PRIMARY KEY,
  accountId INTEGER NOT NULL,
  url TEXT NOT NULL,
  method TEXT NOT NULL,
  headers TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(accountId) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Trigger: update updatedAt on UPDATE for destinations
CREATE TRIGGER IF NOT EXISTS trg_destinations_updated
AFTER UPDATE ON destinations
FOR EACH ROW
BEGIN
  UPDATE destinations SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
