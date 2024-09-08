FROM python:3.9-slim

WORKDIR /app

COPY ./certs/server.cert .
COPY ./certs/server.key .

COPY requirements.txt /app

RUN apt-get update && apt-get install -y gcc

RUN pip install --upgrade pip && \
    pip3 install -r requirements.txt

COPY start.sh /
RUN chmod +x /start.sh

EXPOSE 8000

ENTRYPOINT ["sh", "/start.sh"]

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["python3", "manage.py", "runsslserver", "--certificate /app/certs/server.cert", "--key /app/certs/key.key", "0.0.0.0:8000"]
CMD ["python3", "manage.py", "runsslserver", "--certificate", "/app/certs/server.cert", "--key", "/app/certs/server.key", "0.0.0.0:8000"]