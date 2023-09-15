
/**
 * The enumeration that represents the different db error types.
 *
 * @export
 * @enum {number}
 */
export enum DBErrorType {
    UNKNOWN = "UNKNOWN",
    DUPLICATE_ENTRY = "DUPLICATE_ENTRY"
}

/**
 * The DB Error interface.
 *
 * @export
 * @interface EntityError
 */
export interface DBError {
    type : DBErrorType
    error :  Error,
}

/**
 * Parse a error into a EntityError, a object that contains the error and a
 * parsed error type.
 *
 * @private
 * @param {Error} error The error to parse.
 * @returns {EntityError} The parsed Error.
 * @memberof AppBaseEntity
 */
export function parseDBError(error : Error) : DBError {

    
    switch (error["code"]) {
        case "23505":
            return {
                type: DBErrorType.DUPLICATE_ENTRY,
                error,
            };       
        default:
            return {
                type: DBErrorType.UNKNOWN,
                error,
            };
    }

}
