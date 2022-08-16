import { Auth0ContextInterface } from "@auth0/auth0-react";
import { User } from "../generated";
import { Auth0Context } from "../services-def";

export class Auth0Wrapper implements Auth0Context {
  private auth0: Auth0ContextInterface<User> | undefined = undefined;

  setContext(auth0: Auth0ContextInterface<User>): void {
    this.auth0 = auth0;
  }

  async getToken(): Promise<string | undefined> {
    let token: string | undefined = undefined;

    if (process.env.REACT_APP_AUTH0_DEV_TOKEN) {
      return process.env.REACT_APP_AUTH0_DEV_TOKEN;
    }

    if (this.auth0 === undefined) {
      console.error(`Auth0 wrapper uninitiazed`)
      return token
    }

    try {
      token = await this.auth0.getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
      });
    } catch (e: unknown) {
      const error = e as Error;
      if (["Login required", "Consent required"].includes(error.message)) {
        this.auth0.loginWithRedirect();
      }
      else {
        console.error(`name: '${error.name}'`, e)
      }
    }

    return token;
  }
}
