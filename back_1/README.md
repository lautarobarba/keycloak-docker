# NestJS Backend Container

## Dependencias

- Docker (Apéndice)

## Configuración

```bash
$ cp .env.example .env
$ nano .env
```

## Iniciar

```bash
$ docker compose up -d prod/dev
```

_Quitando la opción *-d* se ven los logs del contenedor._

## Detener

```bash
$ # Si estan corriendo con logs visibles
$ #     detener con Ctr+C
$ docker compose down
```

## Debug

```bash
$ docker container exec -it prod/dev bash
```

## Instalar nuevas librerías

```bash
$ # Prod
$ docker compose exec -it dev bash -c "npm install NPM_PACKAGE"
$ # O Dev
$ docker compose exec -it dev bash -c "npm install --save-dev NPM_PACKAGE"
```

## Recursos NestJS

```bash
$ # Para crear un nuevo recurso usamos el generador de NestJs
$ # RESOURCE_NAME puede ser el nombre de una entidad(tabla) en singular
$ docker compose exec -it dev bash -c "nest g resource modules/RESOURCE_NAME --no-spec"
$ # El contenedor va a generar los archivos con el owner ROOT.
$ # Cambiamos el owner para que nos deje editar
$ sudo chown -R ${USER}:${USER} backend/src/modules
```

## Migraciones TypeORM

```bash
$ # Ver migraciones aplicadas:
$ docker compose exec -it dev bash -c "npm run migration:show"
$ # Generar migración
$ docker compose exec -it dev bash -c "npm run migration:generate --name=nombreMigracion"
$ # Aplicar migraciones
$ docker compose exec -it dev bash -c "npm run migration:run"
```

## Crear administrador

```bash
$ docker compose exec -it dev bash -c "npm run create-admin"
$ # Esto creara un nuevo administador con las credenciales
$ #   email: admin@admin.com
$ #   contraseña: admin
```

## Test endpoints

Para testear los endpoints se puede usar Postman o dirigirse a la ruta **/api/docs** para testear con _Swagger_.

# Apéndice

## Instalación de docker en ubuntu 18.04/20.04/22.04

Fuente: [Instalación docker ubuntu](https://docs.docker.com/engine/install/ubuntu).

```bash
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

$  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
