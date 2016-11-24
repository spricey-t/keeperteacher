

FROM node

USER root

RUN mkdir -p /app
COPY app /app
COPY entrypoint.sh /app

WORKDIR /app

RUN rm -rf /app/node_modules && \
    npm install

ENTRYPOINT ["bash", "entrypoint.sh"]
