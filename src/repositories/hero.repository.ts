import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Hero, HeroRelations, Planet, Species} from '../models';
import {PlanetRepository} from './planet.repository';
import {SpeciesRepository} from './species.repository';

export class HeroRepository extends DefaultCrudRepository<
  Hero,
  typeof Hero.prototype.id,
  HeroRelations
> {
  public readonly friend: BelongsToAccessor<Hero, typeof Hero.prototype.id>;

  public readonly planet: BelongsToAccessor<Planet, typeof Hero.prototype.id>;

  public readonly species: BelongsToAccessor<Species, typeof Hero.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('SpeciesRepository')
    speciesRepositoryGetter: Getter<SpeciesRepository>,
    @repository.getter('PlanetRepository')
    planetRepositoryGetter: Getter<PlanetRepository>,
  ) {
    super(Hero, dataSource);
    this.friend = this.createBelongsToAccessorFor(
      'friend',
      Getter.fromValue(this),
    );
    this.planet = this.createBelongsToAccessorFor(
      'planet',
      planetRepositoryGetter,
    );
    this.species = this.createBelongsToAccessorFor(
      'species',
      speciesRepositoryGetter,
    );
  }
}
