import { createContext, useContext, useCallback } from 'react';
import { Container, interfaces } from 'inversify'

export const container = new Container();
export const ContainerContext = createContext(container)

export function useContainer() {
    return useContext(ContainerContext)
} 

export function useInject<T>(id: interfaces.ServiceIdentifier<T> ) {
    const container = useContainer();
    const createObj = useCallback(() => container.get<T>(id), [container, id])
    return createObj();
}
