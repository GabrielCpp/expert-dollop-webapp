import { Auth0ContextInterface } from "@auth0/auth0-react";
import { EventEmitter } from "fbemitter";
import { User } from "../generated";
import { Auth0Context, Services } from "../services-def";

const EmptyUser: User = Object.freeze({
  email: '',
  id: '',
  oauthId: '',
  organizationId: '',
  permissions: []
})

export class Auth0Wrapper implements Auth0Context {
  private auth0: Auth0ContextInterface<User> | undefined = undefined;
  private userListenner = new EventEmitter()
  private user: User = EmptyUser
  private getServices: () => Services;

  public constructor(getServices: () => Services) {
    this.getServices = getServices;
  }
  
  setContext(auth0: Auth0ContextInterface<User>): void {
    this.auth0 = auth0;
  }

  get currentUser(): User {
    return this.user
  }

  public observeCurrentUser() {
    return {
      subscribe: (listener: (value: User) => void) => {
        const s = this.userListenner.addListener('fire', listener)
        return {unsubscribe: () => s.remove()}
      }
    }
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
        this.getServices().loader.onError(error)
      }
    }

    if(this.user === EmptyUser) {
      await this.reloadUser(token)
    }

    return token;
  }

  private async reloadUser(token: string | undefined) {
    let headers = {}
    let newUser: User = EmptyUser

    if(token) {
      headers = {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await fetch('/api/users/me', {headers})

    if(response.ok) {
      const potentialUser = await response.json() as User | null

      if(potentialUser !== null) {
        newUser = potentialUser
      }
    }
    else {
      this.getServices().loader.onError(new Error(await response.json()))
    }

    this.updateUser(newUser)
  }
  
  private updateUser(newUser: User) {
    if(newUser !== this.user) {
      this.user = newUser
      this.userListenner.emit('fire', newUser)
    }
  }
}
