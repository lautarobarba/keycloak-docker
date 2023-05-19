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

1° Ingresar a keycloak en http://localhost:8001. Loguear con User: kadmin. Passwd: kadmin.

2° Crear un realm Realm: demo_realm. Los usuarios pertenecientes a este realm sólo funcionarán para los clientes conectados a este realm.

3° Configurar en Realm settings->Localization->Español.

4° Crear nuevos clients para las aplicaciones.

- Client ID, Name, Description: next_demo_client.
  Valid redirect URIs: http://localhost:8002/\*. Valid post logout redirect URIs, Web origins: +

- Client ID, Name, Description: react_demo_client.
  Valid redirect URIs: http://localhost:8003/\*. Valid post logout redirect URIs, Web origins: +

5° Crear usuarios:

- Username: usuarioprueba1. Email: usuarioprueba1@gmail.com. First name: Usuario1. Last name: Prueba1.

- Username: usuarioprueba2. Email: usuarioprueba2@gmail.com. First name: Usuario2. Last name: Prueba2.

Después de crearlos tenemos que ir a la pestaña de credenciales y poner una contraseña temporal que se cambia despues del primer inicio: 1234. Dejar marcada la opción temporal.
