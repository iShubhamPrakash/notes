CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    user_name VARCHAR UNIQUE NOT NULL,
    pass_hash VARCHAR NOT NULL
);


CREATE TABLE notes (
    "noteId" serial PRIMARY KEY,
    user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    text VARCHAR,
    pinned BOOLEAN DEFAULT 'f'
);

INSERT INTO users (first_name, last_name, email, user_name, pass_hash)
VALUES
    ('John', 'Doe', 'john@gmail.com', 'john','john@123'),
    ('Simran', 'Shruti', 'simran@gmail.com', 'simran','simran@123');


INSERT INTO notes (title,text,pinned, user_id)
VALUES
    ('Python syntax', 'This is note 1', false, 1),
    ('Songs lyrics', 'This is note 2', true, 2),
    ('Backend development', 'This is note 3', false, 1),
    ('Note title 4', 'This is note 4', false, 1),
    ('Note title 5', 'This is note 5', true, 2),
    ('Note title 6', 'This is note 6', false, 1),
    ('Note title 7', 'This is note 7', false, 1),
    ('Note title 8', 'This is note 8', true, 2),
    ('Music is good', 'This is note 9', false, 2),
    ('Note title 10', 'This is note 10', false, 1);