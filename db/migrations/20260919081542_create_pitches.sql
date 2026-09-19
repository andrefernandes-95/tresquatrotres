-- migrate:up
create table pitches(
    id bigint generated always as identity primary key,
    area text not null,
    municipality text not null,
    name text not null,
    description text,
    address text,
    maps_url text,
    created_at timestamptz not null default now(),
    unique (area, municipality, name),
    foreign key (area, municipality)
        references locations (area, municipality)
);

-- migrate:down
drop table pitches;
