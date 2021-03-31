
import { createApolloClient } from './apollo-client'
import { createAxiosClient }  from './axios'
import { createNamedRouteService } from './named-routes'
import { createReduxDb } from './redux-db'
import { AjvWithError } from './ajv'
import { Services } from '../hooks'

export const services: Services = {
    client: createApolloClient(),
    axios: createAxiosClient(),
    routes: createNamedRouteService(),
    reduxDb: createReduxDb(),
    ajv: new AjvWithError(),
}

