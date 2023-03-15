import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Species, SpeciesRelations} from '../models';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id,
  SpeciesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Species, dataSource);
  }
}
