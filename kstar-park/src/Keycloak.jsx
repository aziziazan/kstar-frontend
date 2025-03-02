import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8089",
    realm: "developer",
    clientId: "developer-rest-api"
});



export default keycloak;