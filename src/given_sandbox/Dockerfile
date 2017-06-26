FROM node:6.10.3-alpine
ENV NODE_ENV production

RUN mkdir -p /application
WORKDIR /application

# Install app dependencies
COPY node_modules /application/node_modules
COPY dist /application/dist
COPY src /application/src
COPY assets /application/assets


EXPOSE 3000

CMD [ "node", "dist/server.js" ]
