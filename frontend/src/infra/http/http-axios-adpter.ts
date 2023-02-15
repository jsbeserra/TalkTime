import HttpClient from "../http/http-client";
import axios, { AxiosInstance } from "axios";
import { environment } from "../../main/config/config";
export default class AxiosAdapter implements HttpClient {
    private apiAxios:AxiosInstance

    constructor(){
        let axiosInstance = axios.create({});
        axiosInstance.defaults.baseURL = environment.API_URL
        this.apiAxios = axiosInstance
    }

    async get(url: string): Promise<any> {
        const jwt = sessionStorage.getItem('jwt')
        // this.apiAxios.defaults.headers = { 'Authorization': 'Bearer ' + jwt }
        const response = await this.apiAxios.get(url)
        return response.data
    }

    async post(url: string, body: any): Promise<any> {
        const jwt = sessionStorage.getItem('jwt')
        // this.apiAxios.defaults.headers = { 'Authorization': 'Bearer ' + jwt }
        const response = await this.apiAxios.post(url,body)
        return response.data
    }

    async put(url: string, body: any): Promise<any> {
        const jwt = sessionStorage.getItem('jwt')
        // this.apiAxios.defaults.headers = { 'Authorization': 'Bearer ' + jwt }
        const response = await this.apiAxios.put(url,body)
        return response.data
    }
    
    async delete(url: string): Promise<any> {
        const jwt = sessionStorage.getItem('jwt')
        // this.apiAxios.defaults.headers = { 'Authorization': 'Bearer ' + jwt }
        const response = await this.apiAxios.delete(url)
        return response.data
    }
}