import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { OmitFunctions } from './type-utils';
import { cloneDeep } from 'lodash';
import { removeUndefinedProperties } from './helpers/remove-undefined-properties';

export abstract class AppEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @BeforeInsert()
  setCreationDates(): void {
    const date = new Date();

    if (!this.createdAt) {
      this.createdAt = date;
    }
    if (!this.updatedAt) {
      this.updatedAt = date;
    }
  }

  @BeforeUpdate()
  setUpdateDates(): void {
    this.updatedAt = new Date();
  }

  softDelete(): void {
    this.deletedAt = new Date();
  }

  /**
   * This method updates a subset of the entities fields.
   *
   * @param {(Partial<this> & FilterBaseEntityFields<BaseEntity>)} updateFields The update values.
   * @return {*}  {this} The current entity.
   * @memberof AppEntity
   */
  updateFields(updateFields: Partial<OmitFunctions<this>>): this {
    // 1 - Create a copy of the updateFields object to avoid overwrite the argument object.
    let updateObject = cloneDeep(updateFields);

    // 2 - Remove the undefined fields of the update object.
    updateObject = removeUndefinedProperties(updateObject);

    Object.assign(this, updateObject);
    return this;
  }

  /**
   * Validates the integrity of the current entity.
   * This method will be executed before save or update the entity.
   *
   * @memberof AppEntity
   * @throws error If the entity is not valid.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
