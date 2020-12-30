import { TextField, Box } from '@material-ui/core'
import { ContainerModule, interfaces } from "inversify";

export { ajvModule } from './ajv-compose'

export const middlewareModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {

    bind(Symbol.for('text-box')).toConstantValue(TextField)
    bind(Symbol.for('box')).toConstantValue(Box)
});