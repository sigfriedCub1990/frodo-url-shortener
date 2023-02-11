# Frodo, the URL shortener

## Motivation

- To have fun building a simple `URL shortener` using a non-cryptographic hash
  function from the [MurmurHash family](https://github.com/aappleby/smhasher). I chose
  Murmurhash based on [this answer](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633).
- To learn how to setup a simple environment using [Docker](https://docs.docker.com/get-docker/),
  [Redis](https://redis.io/) and [Node.js](https://nodejs.org/en/).

## Installation

```sh
    # To run the URL shortener run the following `two` commands
    docker-compose build
    docker-compose up -d
    # You can still use `redis` and run the `Gandalf` container :)
    docker-compose build
    docker-compose up -d redis
    npm run dev
```

## Usage

````sh
    curl --data '{"url": "https://sigfried.xyz"}' --header 'Content-Type: application/json' http://localhost:3000/api/v1/shorten
    # Response will be a JSON with an URL
    ```json
    { "url": "localhost:3000/c19fcdc5" }
    ```
    # Next step is to put the returned URL in your browser
    # and you'll be redirected to the original URL, i.e. https://sigfried.xyz.
````

## Example API

- [Bit.ly](https://dev.bitly.com/api-reference)
