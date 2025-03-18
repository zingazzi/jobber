# Jobber

This is a simple test project in order to try nx and nestjs.
The goal is create a Job Engine, a system that allows to create and manage jobs.

## Architecture

Project is composed by 4 microservices:

### Public Microservices

- Jobber Auth
- Jobber Handler

### Private Microservices

- Jobber Worker
- Product

All public microservices are built with nestjs and comunicate to external using GraphQL.
All microservices (both public and private) will comunicate between them using gRPC.

### Other components

- Apache Pulsar
- Postgres

## Diagram

/*
graphQL   +-------+
  <-------+       |
          | Auth  |
          +------++
            ^    |
            |    |
            |    |                +--------+           +---------+
            |    v      gRPC      |        | gRPC      |         |
          +-+-----+<--------------+ Worker +---------->|Product  |
 graphQL  |       |               +--------+           +---------+
  <-------+ Job   |                   ^
          +-------+|                  |
                   |                  |
                   |                  |
                   |   produce    +---+----+
                   +------------->|        |
                                  | Pulsar |
                                  |        |
                                  +--------+
 */

## Start project

> **_NOTE:_** todo

## TODO

[] Finalize docker compose
[] Fix CICD lint
[] Add tests
[] Finalize Auth service using jwt
[] Create Job Microservice
[] Comunicate between Auth and Job using gRPC
[] ...
