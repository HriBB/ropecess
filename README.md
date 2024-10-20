# Ropecess

- [production](https://ropecess.eu/)
- [staging](https://ropecessclimb.si/)
- [example](https://ropeaccess.se/)

## Installation

```bash
# install dependencies
npm install

# copy .env file
cp .env.example .env

# run development server
npm run dev
```

## Traefik Basic Auth

https://coolify.io/docs/knowledge-base/traefik/basic-auth

1. Generate password

```bash
htpasswd -nbB ropecess <password>
ropecess:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

2. Add to Traefik config

```
traefik.http.middlewares.auth.basicauth.users=ropecess:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
traefik.http.routers.<unique_router_name>.middlewares=auth
```
