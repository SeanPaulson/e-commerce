-- Table: commerce.user

-- DROP TABLE IF EXISTS commerce."user";

CREATE TABLE IF NOT EXISTS commerce."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email_address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(12) COLLATE pg_catalog."default",
    password character varying(156) COLLATE pg_catalog."default" NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now(),
    modified_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT email_check CHECK (email_address::text ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'::text) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS commerce."user"
    OWNER to postgres;

GRANT ALL ON TABLE commerce."user" TO "Sean";

GRANT ALL ON TABLE commerce."user" TO postgres;

GRANT ALL ON TABLE commerce."user" TO sean;

-- Trigger: update_created_at

-- DROP TRIGGER IF EXISTS update_created_at ON commerce."user";

CREATE TRIGGER update_created_at
    BEFORE INSERT
    ON commerce."user"
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_created_at_column();

-- Trigger: update_modified_on

-- DROP TRIGGER IF EXISTS update_modified_on ON commerce."user";

CREATE TRIGGER update_modified_on
    BEFORE UPDATE 
    ON commerce."user"
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_modified_at_column();