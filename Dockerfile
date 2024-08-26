FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/

RUN apt-get update && apt-get install -y gcc

RUN pip install --upgrade pip && \
    pip3 install -r requirements.txt

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
