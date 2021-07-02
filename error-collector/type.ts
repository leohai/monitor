export enum HTTPTYPE {
    XHR = 'xhr',
    FETCH = 'fetch'
}
export interface MyHttp {
    type: 'xhr' | 'fetch'
    traceId?: string
    method?: string
    url?: string
    status?: number
    reqData?: any
    // statusText?: string
    sTime?: number
    elapsedTime?: number
    responseText?: any
    time?: number
    isSdkUrl?: boolean
    // for wx
    errMsg?: string
  }
export interface MyHttpRequest extends XMLHttpRequest {
    [key: string]: any
    _xhr?: MyHttp
}