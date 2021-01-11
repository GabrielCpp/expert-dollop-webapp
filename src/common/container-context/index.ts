import { createContext, useContext, useCallback } from 'react';
import { Container, ContainerModule, inject, injectable, interfaces } from 'inversify'

export function createContainer() {
    const container = new Container();
    container.load(new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
        bind(Container).toConstantValue(container);
    }));

    return container;
}

export const container = createContainer();
export const ContainerContext = createContext(container)

export function useContainer() {
    return useContext(ContainerContext)
} 

export function useInject<T>(id: interfaces.ServiceIdentifier<T> ) {
    const container = useContainer();
    const createObj = useCallback(() => container.get<T>(id), [container, id])
    return createObj();
}

export function injectClass(Class: any, parameters: interfaces.ServiceIdentifier<any>[]=[]): any {
    const x = injectable()(Class)
    parameters.forEach((p, i) => inject(p)(Class, undefined as any, i))
    return x
}

export function injectFunction(func: (...p: any[]) => any, dependencies: interfaces.ServiceIdentifier<any>[]=[]) {
    const proxyInjectClass = class {
        constructor(container: Container) {
            const injections = dependencies.map((dependency) => {
                return container.get(dependency);
            });

            return func.apply(func, injections);
        }
    }

    return injectClass(proxyInjectClass, [Container])
}

