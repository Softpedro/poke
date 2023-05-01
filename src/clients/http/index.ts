import { BaseUrl } from '../../configs/BaseUrl';

interface SuccessApiRes<Result> {
    isOk: true
    result: Result
}
interface ApiResError {
    message: string
    code?: string
    name?: 'AbortError'
}
interface ErrorApiRes {
    isOk: false
    error?: ApiResError
}
export type ApiRes<Result> = SuccessApiRes<Result> | ErrorApiRes

export interface HttpReqConfig {
    config?: RequestInit
    type?: 'json'
    params?: HttpReqParams
    baseUrl?: string
    body?: Record<string, unknown>
}

interface HttpReqParams {
    limit?: number
    offset?: number
}

async function httpRequest<Result>(path: string, config: HttpReqConfig): Promise<ApiRes<Result>> {
    const baseUrl = config.baseUrl || BaseUrl.DEFAULT
    let body: string | undefined
    if (config.body)
        body = JSON.stringify(config.body)
    let strSearchParams = ''
    if (config.params)
        strSearchParams = `?${new URLSearchParams(config.params as Record<string, string>).toString()}`
    try {
        const url = `${baseUrl}${path}${strSearchParams}`
        const res = await fetch(url, { ...config.config, body })
        const resType = config.type || 'json'
        const result = await res[resType]()
        return {
            isOk: true,
            result,
        }
    }
    catch (error) {
        const responseError = error as ApiResError
        return {
            isOk: false,
            error: responseError,
        }
    }
}

export async function httpGet<Result>(
    path: string,
    config: HttpReqConfig = {},
    ): Promise<ApiRes<Result>> {
    return httpRequest(path, {
        ...config,
        config: {
            ...config.config,
            method: 'GET',
        },
    })
}

export async function httpPost<Result>(
    path: string,
    config: HttpReqConfig = {},
): Promise<ApiRes<Result>> {
    return httpRequest(path, {
        ...config,
        config: {
            ...config.config,
            method: 'POST',
        },
    })
}
