export function defaultEquals(a:any,b:any) {
    return a === b
    
}
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
};
export function defaultCompare(a:any, b:any) {
	if (a === b) {
	    return 0;
	}
	return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN; // {2}
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
