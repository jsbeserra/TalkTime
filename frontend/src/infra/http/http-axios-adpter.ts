import HttpClient from "../http/http-client";
import axios, { AxiosInstance } from "axios";
import { environment } from "../../main/config/config";
import { Either, right, left } from "../../shared/either";
import ResponseError from "../../shared/response-error";
export default class AxiosAdapter implements HttpClient {
    private apiAxios: AxiosInstance

    constructor() {
        let axiosInstance = axios.create({});
        axiosInstance.defaults.baseURL = environment.API_URL
        this.apiAxios = axiosInstance
    }

    async get(url: string): Promise<Either<ResponseError, any>> {
        try {
            const jwt = sessionStorage.getItem('jwt')
            const response = await this.apiAxios.get(url)
            return right(response.data)
        } catch (err: any) {
            return left(new ResponseError(err.message, err.statusCode))
        }
    }

    async post(url: string, body: any): Promise<Either<ResponseError, any>> {
        try {
            const jwt = sessionStorage.getItem('jwt')
            const response = await this.apiAxios.post(url, body)
            return right(response.data)
        } catch (err: any) {
            return left(new ResponseError(err.message, err.statusCode))
        }
    }

    async put(url: string, body: any): Promise<Either<ResponseError, any>> {
        try {
            const jwt = sessionStorage.getItem('jwt')
            const response = await this.apiAxios.put(url, body)
            return right(response.data)
        } catch (err: any) {
            return left(new ResponseError(err.message, err.statusCode))
        }
    }

    async delete(url: string): Promise<Either<ResponseError, any>> {
        try {
            const jwt = sessionStorage.getItem('jwt')
            const response = await this.apiAxios.delete(url)
            return right(response.data)
        } catch (err: any) {
            return left(new ResponseError(err.message, err.statusCode))
        }
    }
}