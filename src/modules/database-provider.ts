import { ContainerModule, interfaces } from "inversify";
import { ReduxDatabase } from "../common/redux-db/database";
import { buildDbSchema } from "../db-schema";


export const reduxDatabaseModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    const db = new ReduxDatabase()

    buildDbSchema(db);
    bind(ReduxDatabase).toConstantValue(db)
});
