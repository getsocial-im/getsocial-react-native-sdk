// @flow

export const mapToObjJSON = (m: Object) => {
    if (m == null) {
        return JSON.stringify([]);
    }
    return JSON.stringify(Array.from(m).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {}));
};
