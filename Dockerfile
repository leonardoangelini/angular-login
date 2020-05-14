FROM cobaltica/dotnet-sdk-angular:3.1.100 as builder

WORKDIR /src
COPY . .
ARG DEVOPS_BUILDNUM
ARG DEVOPS_GITSHA
RUN  echo "Build Num" $DEVOPS_BUILDNUM
RUN  echo "Git Sha" $DEVOPS_GITSHA
RUN echo "{version:\""$(head -n 1 VERSION)"\",build: \""$DEVOPS_BUILDNUM"\",sha:\""$DEVOPS_GITSHA"\"}" > version.json
RUN cat version.json
## Get packages
# WORKDIR /ng-app/
RUN npm i

# RUN node --max_old_space_size=8192 ./node_modules/.bin/ng build --prod --c=$enviroment
RUN ng build --prod
FROM nginx:1.17-alpine

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /src/dist /usr/share/nginx/html
COPY --from=builder /src/version.json /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
