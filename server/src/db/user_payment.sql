-- Table: commerce.user_payment

-- DROP TABLE IF EXISTS commerce.user_payment;

CREATE TABLE IF NOT EXISTS commerce.user_payment
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer,
    expires date,
    account_number integer,
    provider character varying(20) COLLATE pg_catalog."default",
    created_at time with time zone NOT NULL DEFAULT now(),
    modified_at time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_payment_pkey PRIMARY KEY (id),
    CONSTRAINT user_payment_account_number_key UNIQUE (account_number),
    CONSTRAINT user_payment_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES commerce."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS commerce.user_payment
    OWNER to postgres;

REVOKE ALL ON TABLE commerce.user_payment FROM sean;

GRANT DELETE, INSERT, REFERENCES, SELECT, TRUNCATE, UPDATE ON TABLE commerce.user_payment TO "Sean";

GRANT ALL ON TABLE commerce.user_payment TO postgres;

GRANT REFERENCES, TRUNCATE, UPDATE, DELETE, SELECT, INSERT ON TABLE commerce.user_payment TO sean WITH GRANT OPTION;

-- Trigger: update_created_at

-- DROP TRIGGER IF EXISTS update_created_at ON commerce.user_payment;

CREATE TRIGGER update_created_at
    BEFORE INSERT
    ON commerce.user_payment
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_created_at_column();

-- Trigger: update_modified_on

-- DROP TRIGGER IF EXISTS update_modified_on ON commerce.user_payment;

CREATE TRIGGER update_modified_on
    BEFORE UPDATE 
    ON commerce.user_payment
    FOR EACH ROW
    EXECUTE FUNCTION commerce.update_modified_at_column();