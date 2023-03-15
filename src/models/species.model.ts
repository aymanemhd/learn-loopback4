import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Species extends Entity {
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

  @property({
    type: 'number',
  })
  lifespan?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Species>) {
    super(data);
  }
}

export interface SpeciesRelations {
  // describe navigational properties here
}

export type SpeciesWithRelations = Species & SpeciesRelations;
