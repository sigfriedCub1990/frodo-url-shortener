# Frodo!, the URL shortener

## Index

1. [Motivation](#motivation)
2. [Installation](#installation)
3. [Usage](#usage)

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

## Usage

```sh
    # http is [httpie](https://httpie.org/)
    http POST :3000/ url='https://google.com'
    # This should return the next `JSON`
    ``
    { "url": "localhost:3000/c19fcdc5" }
    ``
    # Next step is to just put the returned URL in your browser
    # and... VOILA!
```
