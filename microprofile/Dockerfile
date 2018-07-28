FROM anapsix/alpine-java

RUN apk add postgresql

ADD target/*.jar /opt/wunderbaren-microbundle.jar
ADD wait-for-postgres.sh /opt/wait-for-postgres.sh
RUN chmod +x /opt/wait-for-postgres.sh

EXPOSE 8080

CMD [ "java", "-jar", "/opt/wunderbaren-microbundle.jar" ]