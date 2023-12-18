import { LocalAuth } from "@core/model/local-auth";
import { AUTH } from "@core/utility/settings";
import StorageService from "@shared/services/storage.service";

export function authHeaders() {
  const token = StorageService.load(AUTH) as LocalAuth;
  if (!token) {
    throw new Error("no authentication tokens available");
  }

  return {
    headers: {
      "oauth-token-code": token.oauth_token,
      "oauth-client-secret": token.oauth_client_secret,
      "oauth-token-refresh-token": token.oauth_refresh_token,
    },
  };
}
