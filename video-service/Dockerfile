FROM node

USER root

RUN mkdir -p /app
COPY app /app
COPY entrypoint.sh /app

WORKDIR /app

ENTRYPOINT ["bash", "entrypoint.sh"]