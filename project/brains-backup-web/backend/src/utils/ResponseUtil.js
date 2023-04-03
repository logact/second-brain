export function wrapResponse(code,msg,data){
    return {
        code,
        msg,
        data

    }
}
export function wrapOkResponse(data){
    return wrapResponse(200,'success',data)
}