import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Planet extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Planet>) {
    super(data);
  }
}

export interface PlanetRelations {
  // describe navigational properties here
}

export type PlanetWithRelations = Planet & PlanetRelations;
