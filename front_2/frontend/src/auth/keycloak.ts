import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8001",
  realm: "demo_realm",
  clientId: "react_demo_client",
});

export default keycloak;
