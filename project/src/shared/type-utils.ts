// 1 Transform the type to flag all the undesired keys as 'never'
/* eslint-disable max-len */
export type FlagExcludedType<Base> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof Base]: Base[Key] extends Function ? never : Key;
};
/* eslint-enable max-len*/

// 2 Get the keys that are not flagged as 'never'
export type AllowedNames<Base> = FlagExcludedType<Base>[keyof Base];

// 3 Use this with a simple Pick to get the right interface, excluding the undesired type
export type OmitType<Base> = Pick<Base, AllowedNames<Base>>;

/**
 * Create a type that remove the function fields of the provided type.
 */
export type OmitFunctions<Base> = Pick<Base, AllowedNames<Base>>;
