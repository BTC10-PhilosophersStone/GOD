drop database god;

create database god;

\c god;

create extension vector;

create table product (
                         id serial primary key,
                         create_at_data date,
                         name VARCHAR(250),
                         issues_who VARCHAR(250),
                         issues_what VARCHAR(250),
                         issues_when VARCHAR(250),
                         issues_where VARCHAR(250),
                         issues_why VARCHAR(250),
                         issues_how VARCHAR(250),
                         issues_what_why TEXT,
                         issues_vector vector(1536),
                         issues_content TEXT,
                         provided_how VARCHAR(250),
                         provided_why VARCHAR(250),
                         provided_outcome VARCHAR(250),
                         provided_vector vector(1536),
                         department_combine VARCHAR(250),
                         department_vector vector(1536),
                         classification_combine VARCHAR(250),
                         classification_vector vector(1536)
);

create table department (
                            id serial primary key,
                            product_id int,
                            department_name VARCHAR(250),
                            office_name VARCHAR(250)
);

create table  classification (
                                 id serial primary key,
                                 product_id int,
                                 main_category VARCHAR(250),
                                 sub_category VARCHAR(250),
                                 minor_category VARCHAR(250)
);

create  table  department_mst (
                                  id serial primary key,
                                  department_name VARCHAR(250)
);
