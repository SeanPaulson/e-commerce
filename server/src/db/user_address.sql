-- Table: commerce.user_address

-- DROP TABLE IF EXISTS commerce.user_address;

CREATE TABLE IF NOT EXISTS commerce.user_address
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    address_line1 character varying(56) COLLATE pg_catalog."default",
    address_line2 character varying(56) COLLATE pg_catalog."default",
    city character varying(56) COLLATE pg_catalog."default",
    state character varying(3) COLLATE pg_catalog."default",
    zip_code character varying(5) COLLATE pg_catalog."default",
    country_code character varying(3) COLLATE pg_catalog."default",
    user_id integer NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    modified_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_address_pkey PRIMARY KEY (id),
    CONSTRAINT user_address_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES commerce."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS commerce.user_address
    OWNER to postgres;

REVOKE ALL ON TABLE commerce.user_address FROM sean;

GRANT DELETE, INSERT, REFERENCES, SELECT, TRUNCATE, UPDATE ON TABLE commerce.user_address TO "Sean";

GRANT ALL ON TABLE commerce.user_address TO postgres;

GRANT REFERENCES, TRUNCATE, UPDATE, DELETE, SELECT, INSERT ON TABLE commerce.user_address TO sean WITH GRANT OPTION;

-- Trigger: update_created_at

-- DROP TRIGGER IF EXISTS update_created_at ON commerce.user_address;

CREATE TRIGGER update_created_at
    BEFORE INSERT
    ON commerce.user_address
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_created_at_column();

-- Trigger: update_modified_on

-- DROP TRIGGER IF EXISTS update_modified_on ON commerce.user_address;

CREATE TRIGGER update_modified_on
    BEFORE UPDATE 
    ON commerce.user_address
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_modified_at_column();