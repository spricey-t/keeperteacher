


CREATE TABLE drill (
  id VARCHAR(255) PRIMARY KEY,
  _version INTEGER,
  name VARCHAR(255) NOT NULL,
  category_id VARCHAR(255)
);


CREATE TABLE category (
  id VARCHAR(255) PRIMARY KEY,
  _version INTEGER,
  name VARCHAR(255) NOT NULL
);
