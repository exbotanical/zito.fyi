---
title: Future Blog Post
subtitle: lorem ipsum dolor
createdAt: 2021-04-28
updatedAt: 2021-06-09
slug: future-blog-post-4
---

```docker
FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o app ./cmd/

WORKDIR /dist

RUN cp /build/app .
RUN cp /build/.env .

FROM scratch

COPY --from=builder /dist/app . /dist/.env ./

ENTRYPOINT ["/app"]
```

For our card list we want to have four in a row, but because
