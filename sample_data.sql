INSERT INTO owners (first_name, last_name) VALUES ('George', 'Krachtopoulos');

INSERT INTO hotels_locations (address, city) VALUES ('Kryopigi 25', 'Chalkidiki');

INSERT INTO hotels (name, location, owner_id, category, price) VALUES ('Cassandra Hotel', 1, 1, 'Hotel', 12);

INSERT INTO reviews (hotel_id, rating) VALUES (1, 4);
INSERT INTO reviews (hotel_id, rating) VALUES (1, 5);
INSERT INTO reviews (hotel_id, rating) VALUES (1, 4);
INSERT INTO reviews (hotel_id, rating) VALUES (1, 3);
INSERT INTO reviews (hotel_id, rating) VALUES (1, 2);
INSERT INTO reviews (hotel_id, rating) VALUES (1, 1);

SELECT * FROM reviews;
SELECT * FROM hotels;