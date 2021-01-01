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

export function injection(x: any, ...p: any[]): any {
    const result = injectable()(x)

    for(const index in p) {
        const target = p[index]
        inject(target)(x.constructor, undefined as any, 0)
    }   

    return result;
}