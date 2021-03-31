
import { createContext, useContext } from 'react';

export const ServiceContext = createContext<unknown>(null)

export function useServices<T>(): T {
    const services = useContext(ServiceContext)
    return services as T
} 