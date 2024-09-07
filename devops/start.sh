#!/bin/sh

cd /app
python3 manage.py makemigrations
python3 manage.py migrate
exec "$@"