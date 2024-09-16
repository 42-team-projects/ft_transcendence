FROM debian:latest

ARG EMAIL_HOST_PASSWORD

RUN apt-get update && apt-get install -y ca-certificates

ADD https://github.com/prometheus/alertmanager/releases/download/v0.21.0/alertmanager-0.21.0.linux-amd64.tar.gz /tmp
RUN tar -xvzf /tmp/alertmanager-0.21.0.linux-amd64.tar.gz -C /opt

WORKDIR /etc/alertmanager

COPY alertmanager.yml ./alertmanager.yml

RUN sed -i 's/auth_password: '\''${EMAIL_HOST_PASSWORD}'\''/auth_password: "'"$EMAIL_HOST_PASSWORD"'"/' alertmanager.yml