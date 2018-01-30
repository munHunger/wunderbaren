FROM munhunger/tomcat:latest

ADD build/wunderbaren-3.0.war /opt/tomcat/webapps/wunderbaren.war

CMD /opt/tomcat/bin/catalina.sh run