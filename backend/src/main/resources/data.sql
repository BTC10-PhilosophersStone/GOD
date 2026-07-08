drop database god;

create database god;

\c god;

create extension vector;

create table product (
                         id serial primary key,
                         create_at_data date,
                         issues_who VARCHAR(250),
                         issues_what VARCHAR(250),
                         issues_when VARCHAR(250),
                         issues_where VARCHAR(250),
                         issues_why VARCHAR(250),
                         issues_embedding vector(1536),
                         provided_who VARCHAR(250),
                         provided_why VARCHAR(250),
                         provided_outcome VARCHAR(250),
                         provided_embedding vector(1536)
);

create table product_department (
                                    id serial primary key,
                                    product_id int,
                                    department VARCHAR(250),
                                    office VARCHAR(250)
);

create  table  product_business (
                                    id serial primary key,
                                    product_id int,
                                    main_category VARCHAR(250),
                                    sub_category VARCHAR(250),
                                    minor_category VARCHAR(250)
);

create table department (
                            id serial primary key,
                            department VARCHAR(250),
                            office VARCHAR(250)
);

create table  classification (
                                 id serial primary key,
                                 main_category VARCHAR(250),
                                 sub_category VARCHAR(250),
                                 minor_category VARCHAR(250)
);
