import { ContainerModule, interfaces } from "inversify";
import axios from 'axios'
import { AXIOS_SERVICE } from "../services";

export const axiosModule = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host;
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000
    });

    bind(AXIOS_SERVICE).toConstantValue(instance)
});