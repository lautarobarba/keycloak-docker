import { Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { KeycloakConnectModule } from "nest-keycloak-connect";
import { AuthController } from "./auth.controller";
@Module({
  imports: [
    // JwtModule.register({}),
    KeycloakConnectModule.register({
      authServerUrl: "http://host.docker.internal:8001",
      realm: "demo_realm",
      clientId: "nest_demo_client",
      // Secret key of the client taken from keycloak server
      // El secreto se saca de: Realm settings -> Keys -> (Algorithm) RS256
      secret:
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApZhZ81ZeU9ZB04FY08HFsHckV3dNFlYiEqJOOyuuPKlL6h+dc5/k63uag3gtAJXo7xwWOAmz2GkKQJBlMTObPU5Cn+0HcOI95aTj1bP0Y8ir97delNfVS6pqB3ng/NniKDki1kMSuxj6KGQA32rBBAR7nToHRn03nfkE07Rtg0JXfNQNp1VKn0xCBij0EeHrs6e6s2fVzv4UbeNPeJFf21S3CawYVqknLxeVme/uydCCRFW6YlFOe8VSbu18Hm8W3D4bMB9M6tnOGFVFRv8N4GWCr5WCcScec6cZR5f+XQnD6eYfOEbgv8ah0EVfH4AbIqRCw8gNxv2VzcI0oZmySQIDAQAB",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
