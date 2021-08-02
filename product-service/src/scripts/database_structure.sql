CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4 (),
    title text NOT NULL,
    description text,
    price int,
    CONSTRAINT products_pk PRIMARY KEY  (id)
);

CREATE TABLE stocks (
    product_id uuid NOT NULL,
    count int,
    CONSTRAINT products_fk FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
