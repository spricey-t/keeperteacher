


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




-- SEED DATA --

INSERT INTO category VALUES ('f1f2b9ff00004970b1ef7956ac229248', 0, 'Catching');
INSERT INTO category VALUES ('1457efc590e14cd4adc65c8a48f2654d', 0, 'Diving');
INSERT INTO category VALUES ('5469e9424bb7449696a580b6b288f194', 0, 'Shot Stopping');
INSERT INTO category VALUES ('41af03e46e924d8daca4a206c3932a53', 0, 'Crosses');
INSERT INTO category VALUES ('b151dc81bdd84473bef4a3cf2c4c2145', 0, 'Highballs');
INSERT INTO category VALUES ('7d4205c101214f769cfabf570111fa9b', 0, 'Hand Drills');
INSERT INTO category VALUES ('a966b8ad0f8a4acfa16373616d2133e4', 0, 'Reaction Drills');
INSERT INTO category VALUES ('c2628d2157fa4197b49edacd0e1bab56', 0, '1v1s');
INSERT INTO category VALUES ('43526c3468a54f77bdf7f756cea536ae', 0, 'Penalty Kicks');
INSERT INTO category VALUES ('51885f4c7fab42bebe2d38f727b2f05d', 0, 'Free Kicks');
INSERT INTO category VALUES ('fbd58df66c5442c3bc82e810356780a9', 0, 'Goalkeeper Warmup');
INSERT INTO category VALUES ('8a85fd5b9c924982a66928f71e1f2d32', 0, 'Catching Fundamentals');
INSERT INTO category VALUES ('f320adf19ce74c2d82adf61b6da542f8', 0, 'Footwork');
INSERT INTO category VALUES ('19f1ada14e4d4c7db07eeb6275f27c57', 0, 'Bodyshape');
INSERT INTO category VALUES ('b3b3644509bf46919995142bafa3cebd', 0, 'Distribution Fundamentals');
INSERT INTO category VALUES ('8e776afb3ae24088844e93d3deba4906', 0, 'Diving Fundamentals');
