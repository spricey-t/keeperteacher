

FROM node

USER root

RUN mkdir -p /app
COPY app /app

WORKDIR /app

RUN rm -rf /app/node_modules && \
    npm install

ENTRYPOINT ["node", "server"]
