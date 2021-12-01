# Croudsourced Combos

A web service for tracking your campus food and seeing what's good!

## Basic Structure

Our app has 3 main components - the frontend, written in NextJS, the backend, a
graphql server, and the postgres database that the backend writes to.

## How to Deploy

There are 2 main approaches, dockerized deployment and local deployment. Since
this project requires Postgres, dockerized deployment is recommended but either
works.

### Dockerized Deployment

This should be really simple, just run `docker compose up` and navigate to
http://localhost:3000. This process can take a minute or two as it's downloading
and installing a lot of both container and npm packages, so consider running the
command and coming back to read this once it's started. The compose file will do
a few things:

1. Spin up a database with a default configuration listed in the
   docker-compose.yml file in the db service's environment variables. It will
   use a volume mount to persist it's data to your CWD, if you're curious it
   will be the `pgdata` folder.  
   We are well aware the dangers of leaving a password in a configuration file
   like this, however this is just an example password, and we expect any
   deployment to change it. To do so, you must change the backend
   service's `DATABASE_URL` to match the db environment
   variables. `DATABASE_URL` is a standard database connection url, please
   see https://stackoverflow.com/a/20722229 for information on how to format
   this url if you are unfamiliar. Additionally, the two containers are
   connected over docker networking, so you should use
   `database` as the hostname.
2. Build the container for and spin up the backend graphql server. The build
   process consists of generating the required GraphQL for simple DB CRUD
   operation straight from the database schema then compiling the typescript
   project to JS to be run with node. Once the container is built, it waits for
   the database to be listening on it's port before it starts.
3. Build and spin up the frontend. This may take a while as it's a bit of a
   weird build pipeline and the nextjs compilation process can be pretty slow.
   Basically though, this takes our components, pages and assorted other files
   and builds them into a webpage then minifies them. It also provides a server
   to serve these files, which is used by the container when it starts up. When
   you navigate to various pages, the frontend makes requests to the backend
   GraphQL server and saturates itself. 

