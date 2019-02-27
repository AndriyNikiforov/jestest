FROM jenkins/jenkins:lts

USER root
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh | bash -
RUN apt-get install nodejs
CMD nodejs -v && npm -v 
