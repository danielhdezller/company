import { DeepPartial, Repository } from 'typeorm';
import { AppEntity } from '../base.entity';
import { OmitFunctions } from '../type-utils';

export class BaseRepository<
  Entity extends AppEntity,
> extends Repository<Entity> {
  /**
   * Create a new app entity forcing to define all not non-generated parameters.
   *
   * @param {(Omit<
   *     OmitFunctions<Entity>,
   *     "id" | "createdAt" | "updatedAt" | "deletedAt"
   *     >)} entityFields
   * @return {*}  {Entity}
   * @memberof BaseRepository
   */
  strictCreate(
    entityFields: Omit<
      OmitFunctions<Entity>,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Entity {
    return this.create(entityFields as DeepPartial<Entity>);
  }

  /**
   * Create a a list of new app entity forcing to define all not non-generated parameters.
   *
   * @param {(Omit<
   *     OmitFunctions<Entity>,
   *     "id" | "createdAt" | "updatedAt" | "deletedAt"
   *     >)} entityFields
   * @return {*}  {Entity}
   * @memberof BaseRepository
   */
  strictCreateMultiple(
    entitiesFields: [
      Omit<
        OmitFunctions<Entity>,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
      >,
    ],
  ): Entity[] {
    return entitiesFields.map((entity) => this.strictCreate(entity));
  }
}
