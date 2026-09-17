-- migrate:up
create table locations (
    area text not null,
    municipality text not null,
    primary key (area, municipality)
);

-- migrate:down

drop table locations;
