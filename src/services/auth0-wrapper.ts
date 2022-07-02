import { Auth0ContextInterface } from "@auth0/auth0-react";
import { CurrentUserDocument, CurrentUserQuery, User } from "../generated";
import { Auth0Context, createNonExistentUser, Services } from "../services-def";

export class Auth0Wrapper implements Auth0Context {
  private auth0: Auth0ContextInterface<User> | undefined = undefined;
  public user: User = createNonExistentUser();

  public constructor(private getServices: () => Services) {}

  setContext(auth0: Auth0ContextInterface<User>): void {
    this.auth0 = auth0;
  }

  async getToken(): Promise<string | undefined> {
    let token: string | undefined = undefined;

    if (process.env.REACT_APP_AUTH0_DEV_TOKEN) {
      return process.env.REACT_APP_AUTH0_DEV_TOKEN;
    }

    if (this.auth0 === undefined) {
      throw new Error("Auth0Wrapper uninitialized");
    }

    try {
      token = await this.auth0.getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
      });
    } catch (e: unknown) {
      const error = e as Error;
      if (error.message === "Consent required") {
        this.auth0.loginWithRedirect();
      }
    }

    return token;
  }

  public async loadUser(): Promise<User> {
    const { apollo } = this.getServices();
    const result = await apollo.query<CurrentUserQuery>({
      query: CurrentUserDocument,
      fetchPolicy: "no-cache",
    });

    this.user = createNonExistentUser();

    if (result.data.currentUser) {
      this.user = result.data.currentUser || createNonExistentUser();
    }

    return this.user;
  }
}
