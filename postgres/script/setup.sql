-- DROP DATABASE IF EXISTS wunderbaren;

-- DROP ROLE IF EXISTS wunderbaren;

/* Create roles and users */
CREATE ROLE wunderbaren WITH LOGIN PASSWORD 'wunderbaren';
ALTER ROLE wunderbaren SUPERUSER;

/* Setup config database */
CREATE DATABASE wunderbaren
    WITH 
    OWNER = wunderbaren
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;