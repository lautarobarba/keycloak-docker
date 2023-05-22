import express from "express";
import { Issuer, Strategy } from "openid-client";
import passport from "passport";
import expressSession from "express-session";

const app = express();

// use the issuer url here
const keycloakIssuer = await Issuer.discover(
  "http://localhost:8080/realms/keycloak-express"
);
// don't think I should be console.logging this but its only a demo app
// nothing bad ever happens from following the docs :)
console.log(
  "Discovered issuer %s %O",
  keycloakIssuer.issuer,
  keycloakIssuer.metadata
);

// client_id and client_secret can be what ever you want
// may be worth setting them up as env vars
const client = new keycloakIssuer.Client({
  client_id: "keycloak-express",
  client_secret: "long_secret-here",
  redirect_uris: ["http://localhost:3000/auth/callback"],
  post_logout_redirect_uris: ["http://localhost:3000/logout/callback"],
  response_types: ["code"],
});

// TODO: Estaba sigueindo este tutorial de medium para conectar keycloak a traves de openid-client
// TODO: Aca esta la consulta https://stackoverflow.com/questions/75321657/resolving-keycloak-client-adapter-deprecation-for-node-js-express-boilerplate-us
// TODO: y aca el tutorial https://medium.com/keycloak/keycloak-express-openid-client-fabea857f11f
