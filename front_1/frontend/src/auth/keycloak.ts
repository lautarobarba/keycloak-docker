import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8001",
  realm: "demo_realm",
  clientId: "next_demo_client",
});

export default keycloak;
