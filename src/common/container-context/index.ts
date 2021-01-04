import { createContext, useContext, useCallback } from 'react';
import { Container, inject, injectable, interfaces } from 'inversify'

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

export function useContainerDispatch(): (fn: (c: Container) => unknown) => () => unknown {
    const container = useContainer();
    return (fn: (c: Container) => unknown) => () => fn(container);
}

export function injectClass(Class: any, ...parameters: any[]): any {
    const x = injectable()(Class)
    parameters.forEach((p, i) => inject(p)(Class, undefined as any, i))
    return x
}