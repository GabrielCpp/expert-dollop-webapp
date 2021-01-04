import { ContainerModule, interfaces } from "inversify";
import { ADD_CONTAINER_VIEW, AddContainerView } from "../components/predykt-project-definition-editor/add-container-view";

export const projectDefintionEditorModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind(ADD_CONTAINER_VIEW).toConstantValue(AddContainerView);
});