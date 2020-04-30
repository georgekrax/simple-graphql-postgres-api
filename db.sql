CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(175) NOT NULL,
	last_name VARCHAR(175) NOT NULL
);

CREATE TABLE hotels_locations (
	id SERIAL PRIMARY KEY,
	address VARCHAR(75) NOT NULL,
	city VARCHAR(75) NOT NULL,
	area VARCHAR(75)
);

CREATE TYPE hotels_types AS ENUM (
	'Hotel',
	'Hostel',
	'Bed&Breakfast',
	'Apartments'
);

CREATE TABLE hotels (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	location INTEGER NOT NULL REFERENCES hotels_locations(id) ON DELETE CASCADE,
	owner_id INTEGER NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
	category hotels_types NOT NULL,
	price SMALLINT NOT NULL,
	avg_rating DECIMAL(2,1),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	hotel_id INTEGER NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
	rating SMALLINT NOT NULL CHECK (rating >= 0 AND rating <= 5),
	body TEXT
);


CREATE OR REPLACE FUNCTION trigger_update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
        NEW.updated_at = now();
        RETURN NEW;
    ELSE
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_modified_column
BEFORE UPDATE ON hotels
FOR EACH ROW
EXECUTE PROCEDURE trigger_update_modified_column();


CREATE OR REPLACE FUNCTION calculate_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
	UPDATE hotels SET avg_rating = (SELECT AVG(rating) FROM reviews WHERE hotel_id=NEW.hotel_id);
	RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER calculcate_avg_rating 
AFTER INSERT OR DELETE OR UPDATE OF rating ON reviews
FOR EACH ROW
EXECUTE PROCEDURE calculate_avg_rating();
