FROM java:8

USER root

ENV KT_JAR_NAME=drills-1.0.0-SNAPSHOT.jar
ENV KT_HOME="/usr/local/keeperteacher"
ENV KT_APP_PATH=$KT_HOME/bin/$KT_JAR_NAME

COPY $KT_JAR_NAME $KT_APP_PATH
RUN sh -c "touch $KT_APP_PATH" && \
    chmod +x $KT_APP_PATH

ENTRYPOINT [ "sh", "-c", "java -jar $KT_APP_PATH" ]