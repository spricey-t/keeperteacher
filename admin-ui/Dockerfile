FROM node

USER root

RUN mkdir -p /app
COPY app /app
COPY entrypoint.sh /app

WORKDIR /app

RUN rm -rf /app/node_modules && \
	rm -rf /app/client/lib/* && \
    npm install && \
	/app/node_modules/bower/bin/bower --allow-root install

ENTRYPOINT ["bash", "entrypoint.sh"]
