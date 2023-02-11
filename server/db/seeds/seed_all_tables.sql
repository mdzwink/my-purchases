-- 01_users

INSERT INTO users (email, password) VALUES('mdzwink', '$2a$10$qvKsMAwkUqx7iYpOihWG..4NwPfZYaRwdJZSG0UkghvVpAHrHcALi');
INSERT INTO users (email, password) VALUES('abdul@example.com', '$2a$10$qvKsMAwkUqx7iYpOihWG..4NwPfZYaRwdJZSG0UkghvVpAHrHcALi');
INSERT INTO users (email, password) VALUES('bilal@example.com', '$2a$10$qvKsMAwkUqx7iYpOihWG..4NwPfZYaRwdJZSG0UkghvVpAHrHcALi');
INSERT INTO users (email, password) VALUES('chadia@example.com', '$2a$10$qvKsMAwkUqx7iYpOihWG..4NwPfZYaRwdJZSG0UkghvVpAHrHcALi');


-- 02_receipts

INSERT INTO receipts (user_id, img, store, date, return_by, total) VALUES(1, 'https://github.com/mdzwink/my-purchases/blob/main/client/public/docs/pexels-picjumbocom-196639.jpg?raw=true', 'Dillans Dough', '08-25-2022', '09-24-2022', 2250);


-- 03_items
-- 04_reminders