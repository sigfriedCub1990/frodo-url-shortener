# Frodo!, the URL shortener

## Index

1. [Motivation](#motivation)
2. [Installation](#installation)

## Motivation

To have fun building a simple `URL shortener` using a non-cryptographic hash
function from the [MurmurHash family](https://github.com/aappleby/smhasher). To play
around a little with `redis` and `Docker`. Because I had the time to do it, but must important, because I chose to.

## Installation

```sh
    # To run the URL shortener run the following `two` commands
    docker-compose build
    docker-compose up -d
    # You can still use `redis` and just run the `Gandalf` container :)
    docker-compose build
    docker-compose up -d redis
    npm run dev
```
