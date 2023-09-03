CREATE OR REPLACE PROCEDURE create_management(schema_name TEXT, user_name TEXT, pass TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
  EXECUTE 'CREATE SCHEMA ' || schema_name;
  EXECUTE 'CREATE TABLE ' || schema_name || '.event (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp NOT NULL DEFAULT now(),
    created_by varchar(50) NOT NULL DEFAULT ''user'',
    updated_at timestamp NOT NULL DEFAULT now(),
    updated_by varchar(50) NOT NULL DEFAULT ''user'',
    active bool NOT NULL DEFAULT true,
    name varchar(120),
    PRIMARY KEY(id)
  )';
  EXECUTE 'CREATE TABLE ' || schema_name || '.post (
  	id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp NOT NULL DEFAULT now(),
    created_by varchar(50) NOT NULL DEFAULT ''user'',
    updated_at timestamp NOT NULL DEFAULT now(),
    updated_by varchar(50) NOT NULL DEFAULT ''user'',
    active bool NOT NULL DEFAULT true,
    event uuid NOT NULL,
    profile uuid NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(event) REFERENCES ' || schema_name || '.event(id),
    FOREIGN KEY(profile) REFERENCES public.profile(id)
  )';
  EXECUTE 'CREATE USER ' || user_name || ' WITH ENCRYPTED PASSWORD ' || quote_literal(pass);
  EXECUTE 'GRANT USAGE, CREATE ON SCHEMA ' || schema_name || ' TO ' || user_name;
  EXECUTE 'GRANT USAGE, CREATE ON SCHEMA public TO ' || user_name;
  EXECUTE 'ALTER ROLE ' || user_name || ' SET search_path = ' || schema_name || ', public';
  EXECUTE 'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ' || schema_name || ' TO ' || user_name;
  EXECUTE 'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ' || user_name;
END;
$$;


call public.create_management('hola', 'alex', '1234');

SELECT * FROM pg_catalog.pg_user;

REASSIGN OWNED BY alex TO postgres;

drop owned by alex;

DROP user alex;

DROP SCHEMA hola;