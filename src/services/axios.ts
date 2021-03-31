import axios, { AxiosInstance } from 'axios'

export function createAxiosClient(): AxiosInstance {
    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host;
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000
    });

    return instance
}
