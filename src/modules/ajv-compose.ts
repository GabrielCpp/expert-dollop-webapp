import { ContainerModule, interfaces } from "inversify";
import { AJV_CUSTOM_ERROR, AjvWithError } from '../services'


export const ajvModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(AJV_CUSTOM_ERROR).to(AjvWithError)
});