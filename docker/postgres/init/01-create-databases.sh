#!/bin/sh
set -eu

psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
  --set="tourism_user=$TOURISM_DB_USER" \
  --set="tourism_password=$TOURISM_DB_PASSWORD" \
  --set="cms_user=$CMS_DB_USER" \
  --set="cms_password=$CMS_DB_PASSWORD" <<'SQL'
CREATE USER :"tourism_user" WITH PASSWORD :'tourism_password';
CREATE DATABASE turismo_db OWNER :"tourism_user";
CREATE USER :"cms_user" WITH PASSWORD :'cms_password';
CREATE DATABASE cms_db OWNER :"cms_user";
SQL
