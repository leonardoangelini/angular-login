ARG enviroment
FROM cobaltica/dotnet-sdk-angular:3.1.100 as builder

WORKDIR /src
COPY . .

## Get packages
# WORKDIR /ng-app/
RUN npm i

# RUN node --max_old_space_size=8192 ./node_modules/.bin/ng build --prod --c=$enviroment
RUN ng build --prod --c=$enviroment
FROM nginx:1.17-alpine

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /src/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
