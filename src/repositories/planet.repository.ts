import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Planet, PlanetRelations} from '../models';

export class PlanetRepository extends DefaultCrudRepository<
  Planet,
  typeof Planet.prototype.id,
  PlanetRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Planet, dataSource);
  }
}
