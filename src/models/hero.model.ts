import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Planet} from './planet.model';
import {Species} from './species.model';

@model({settings: {strict: false}})
export class Hero extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Hero, {keyTo: 'id'})
  friendId?: string;

  @belongsTo(() => Planet, {keyTo: 'id'})
  planetId?: string;

  @belongsTo(() => Species, {keyTo: 'id'})
  speciesId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Hero>) {
    super(data);
  }
}

export interface HeroRelations {
  // describe navigational properties here
}

export type HeroWithRelations = Hero & HeroRelations;
