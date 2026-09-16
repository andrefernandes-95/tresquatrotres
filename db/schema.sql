\restrict dbmate

-- Dumped from database version 17.11
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administrative_areas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.administrative_areas (
    code text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    type text NOT NULL,
    CONSTRAINT administrative_areas_type_check CHECK ((type = ANY (ARRAY['district'::text, 'autonomous_region'::text])))
);


--
-- Name: municipalities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.municipalities (
    code text NOT NULL,
    administrative_area_code text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: administrative_areas administrative_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_areas
    ADD CONSTRAINT administrative_areas_pkey PRIMARY KEY (code);


--
-- Name: administrative_areas administrative_areas_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.administrative_areas
    ADD CONSTRAINT administrative_areas_slug_key UNIQUE (slug);


--
-- Name: municipalities municipalities_administrative_area_code_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_administrative_area_code_slug_key UNIQUE (administrative_area_code, slug);


--
-- Name: municipalities municipalities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_pkey PRIMARY KEY (code);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: municipalities municipalities_administrative_area_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_administrative_area_code_fkey FOREIGN KEY (administrative_area_code) REFERENCES public.administrative_areas(code);


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260916221440');
