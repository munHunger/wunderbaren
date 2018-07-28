#!/bin/sh

echo "Starting wait for postgres";
set -e

host="$1"
export PGPASSWORD=postgres
echo "waiting for host $host";

until psql -h "$host" -U "postgres" -c '\q'; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing command"
java -jar /opt/wunderbaren-microbundle.jar