export function defaultEquals(a:any,b:any) {
    return a === b
    
}
export function Compare(a:any,b:any) {
    return a === b
    
}
export function defaultCompare(a:any,b:any) {
    return a === b
    
}
export function defaultToString(item:any) {
    if(item === null){
        return 'NULL'
    }else if(item === undefined){
        return "UNDEFINED"
    } else if (typeof item === 'string'||item instanceof String){
        return `${item}`
    }
    return item.toString()
    
}
