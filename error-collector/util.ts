export function replaceOld(
    source:{[key: string]:any},
    name: string,
    replacement: (...args: any[]) => any
): void {
    if (!(name in source)) return
    const original = source[name]
    const wrapped = replacement(original)
    if( typeof wrapped === 'function') {
        source[name] = wrapped
    }
}
import { MyHttpRequest } from './type'
type voidFun = () => void
function xhrReplace(): void {
    if(!('XMLHttpRequest' in window)){
        return
    }
    const originalXhrProto = XMLHttpRequest.prototype
    replaceOld(
        originalXhrProto,
        'open',
        (originalOpen: voidFun): voidFun => {
            return function (this:MyHttpRequest, ...args: any[]): void{
                const url = args[1]
                this._xhr = {
                    type: 'xhr',
                    method: (typeof args[0] === 'string') ? args[0].toUpperCase() : args[0],
                    url: args[1]
                }
                // 监控本省自己做个比标记
                // if( this._xhr.method === 'POST' &&  ) this._xhr.isSdkUrl = true
                // originalOpen.apply(this, args)

            }
        }
    )
    replaceOld(
        originalXhrProto,
        'send',
        (originalOpen: voidFun): voidFun => {
            return function (this:MyHttpRequest, ...args: any[]): void{
                const url = args[1]
                this._xhr = {
                    type: 'xhr',
                    method: (typeof args[0] === 'string') ? args[0].toUpperCase() : args[0],
                    url: args[1]
                }
                // on()
                // 监控本省自己做个比标记
                // if( this._xhr.method === 'POST' &&  ) this._xhr.isSdkUrl = true
                // originalOpen.apply(this, args)

            }
        }
    )
}