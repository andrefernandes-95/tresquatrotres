-- migrate:up
create table administrative_areas (
    code text primary key, -- text, not small int. this way we never lose 0s in left i.e. '0101'
    name text not null,
    slug text not null unique,
    type text not null check (type in ('district', 'autonomous_region')) -- enum not needed just for two values
);

create table municipalities (
    code text primary key,
    administrative_area_code text not null references administrative_areas(code),
    name text not null,
    slug text not null,
    unique (administrative_area_code, slug) -- combine administrative area with slug, there can be multiple municipalities named 'Vila Nova'
);


-- migrate:down

drop table municipalities; -- first, drop municipalities because of the foreign keys
drop table administrative_areas;

