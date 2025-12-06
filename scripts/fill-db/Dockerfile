FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
libgssapi-krb5-2 curl

ARG FAKE_API
ARG MONGO_URI

ENV HOME="/home"
ENV WORKSPACE="${HOME}/workspace"
ENV ARCHIVES="${WORKSPACE}/archives"


RUN mkdir -p /home/workspace/archives
COPY "./fill-database" ${WORKSPACE}

COPY "archives/mongodb-database-tools-ubuntu2204-x86_64-100.13.0.tgz" ${ARCHIVES}

WORKDIR ${ARCHIVES}
RUN tar -xzvf "${ARCHIVES}/mongodb-database-tools-ubuntu2204-x86_64-100.13.0.tgz"
RUN cp -r "${ARCHIVES}/mongodb-database-tools-ubuntu2204-x86_64-100.13.0" ${WORKSPACE}

WORKDIR ${WORKSPACE}

# CMD ["tail", "-f", "/dev/null"]
CMD ["./fill-database"]



