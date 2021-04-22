-- creates database
CREATE DATABASE movie_db;
-- enters database
\c movie_db

--creates table
CREATE TABLE IF NOT EXISTS movie_reviews(
    id SERIAL PRIMARY KEY,
    movie_title VARCHAR NOT NULL,
    review VARCHAR NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
