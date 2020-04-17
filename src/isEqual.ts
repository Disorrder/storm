export default function isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;

    const type = typeof a;
    if (type === "object") return isEqualObject(a, b);

    return false;
}

// Check deep
function isEqualObject(a: any, b: any): boolean {
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return !keysA.some((k) => {
        return !isEqual(a[k], b[k]);
    });
}