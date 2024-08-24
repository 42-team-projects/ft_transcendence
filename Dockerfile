FROM python:3.9-slim

WORKDIR /app

RUN apt-get update -y && apt-get install gcc -y

COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
