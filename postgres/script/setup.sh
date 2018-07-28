#!/bin/bash
echo 'Killing potential previous postmasters'
kill $(cat /var/lib/postgresql/9.5/main/postmaster.pid | head -n 1)
sleep 2
echo 'starting postgres on local listen address'
sed -i "s/listen_addresses='\*'/listen_addresses='127.0.0.1'/g" /etc/postgresql/9.5/main/postgresql.conf
/usr/lib/postgresql/9.5/bin/postgres -D /var/lib/postgresql/9.5/main -c config_file=/etc/postgresql/9.5/main/postgresql.conf -n -T &
LOCAL_PID=$!
sleep 2
echo 'waiting for postgres to start'
until ( ( psql -h "$host" -U "postgres" -c '\q' ) && ( kill -0 $LOCAL_PID ) 2> /dev/null ) ;do
  sleep 1
done

echo '--------------Creating base settings-------------'
echo 'Setting password postgres to user postgres';
psql -U postgres -d postgres -c "ALTER USER postgres PASSWORD 'postgres'";
echo 'Setting up postgres database';
psql -U postgres -d postgres -a -f /script/setup.sql > /dev/null;

echo 'killing local setup instance'
kill $LOCAL_PID
sleep 2
echo 'starting postgres listening on *'
sed -i "s/listen_addresses='127.0.0.1'/listen_addresses='\*'/g" /etc/postgresql/9.5/main/postgresql.conf
/usr/lib/postgresql/9.5/bin/postgres -D /var/lib/postgresql/9.5/main -c config_file=/etc/postgresql/9.5/main/postgresql.conf
