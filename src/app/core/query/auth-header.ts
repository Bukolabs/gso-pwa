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
      // "oauth-token-code": "47240130-db8b-4d64-80d9-3f81c2714f81",
      // "oauth-client-secret": "fd3038e7-256b-4f2e-8cb7-38a1f816ec0b",
      "oauth-token-code": token.oauth_token,
      "oauth-client-secret": token.oauth_client_secret,
      "oauth-token-refresh-token": token.oauth_refresh_token,
      department: token.department_name,
    },
  };
}
