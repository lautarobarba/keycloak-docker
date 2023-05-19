# Demo de keycloak

En esta demo se van a levantar los siguientes servicios

- Fullstack:

  - Keycloak: keycloak

- Frontends:

  - Front_1: next_app (create-next-app)
  - Front_2: react_app (create-react-app)

- Backends:

  - Back_1: nest_api
  - Back_2: larave_api

- Bases de datos (3 instancias de postgres):
  - Database_1: keycloak_db (usuarios_locales)
  - Database_2: nest_db
  - Database_3: laravel_db

# Schema

![Schema](https://raw.githubusercontent.com/lautarobarba/keycloak-docker/main/images/schema.png "Schema")

# Setup

## Keycloak

1° Crear un realm. Los usuarios pertenecientes a este realm sólo funcionarán para los clientes conectados a este realm.
2° Crear 1 role.
