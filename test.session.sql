-- @block
SHOW databases;
-- @block
SHOW tables ;
-- @block
DESCRIBE Users;
-- @block
DESCRIBE Rooms
-- @block
SELECT *
FROM Users ;
-- @block
SELECT * FROM Rooms
-- @block
SELECT * FROM Users
RIGHT JOIN Rooms
ON Rooms.owner_id = Users.id;
-- @block
INSERT INTO Users(email,bio,country)
VALUES(
    'ewa@gmail.com','hi there','pl'
);
-- @block
ALTER TABLE Users
ADD UNIQUE (email);
-- @block Delete row
DELETE FROM Users WHERE
id=3
-- @block create Room Table
CREATE TABLE Rooms(
    id INT AUTO_INCREMENT,
    street VARCHAR(255),
    owner_id INT NOT NULL,
    price INT,
    hot_tub BOOLEAN,
    room_type VARCHAR(255),
    home_type VARCHAR(255),
    total_occupancy INT,
    total_bedrooms INT,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
)
-- @block add block of rooms to Rooms Table
INSERT INTO Rooms(owner_id,street)
VALUES
    (1,'san diego sailboat'),
    (1,'natucket cottage'),
(2,'vail cabin'),
(1,'sf cardboard box');
-- @block
INSERT INTO Users (email,bio,country)
VALUES ('rami@gmail.com','Clean and tidy','IT')