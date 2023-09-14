/**
 * Remove the undefined properties of a object and the nested related object.
 *
 * @export
 * @param {*} obj The object to clean.
 * @return {*} The cleaned object.
 */
export function removeUndefinedProperties(obj: any) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key]))
      newObj[key] = removeUndefinedProperties(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
}
