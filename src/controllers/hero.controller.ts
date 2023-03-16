import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Hero, Planet, Species} from '../models';
import {HeroRepository} from '../repositories';

export class HeroController {
  constructor(
    @repository(HeroRepository)
    public heroRepository: HeroRepository,
  ) {}

  @post('/heroes')
  @response(200, {
    description: 'Hero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hero, {
            title: 'NewHero',
            exclude: ['id'],
          }),
        },
      },
    })
    hero: Omit<Hero, 'id'>,
  ): Promise<Hero> {
    return this.heroRepository.create(hero);
  }

  @get('/heroes/count')
  @response(200, {
    description: 'Hero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Hero) where?: Where<Hero>): Promise<Count> {
    return this.heroRepository.count(where);
  }

  @get('/heroes')
  @response(200, {
    description: 'Array of Hero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hero, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Hero) filter?: Filter<Hero>): Promise<Hero[]> {
    return this.heroRepository.find(filter);
  }

  @patch('/heroes')
  @response(200, {
    description: 'Hero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hero, {partial: true}),
        },
      },
    })
    hero: Hero,
    @param.where(Hero) where?: Where<Hero>,
  ): Promise<Count> {
    return this.heroRepository.updateAll(hero, where);
  }

  @get('/heroes/{id}')
  @response(200, {
    description: 'Hero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Hero, {exclude: 'where'}) filter?: FilterExcludingWhere<Hero>,
  ): Promise<Hero> {
    return this.heroRepository.findById(id, filter);
  }

  @patch('/heroes/{id}')
  @response(204, {
    description: 'Hero PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hero, {partial: true}),
        },
      },
    })
    hero: Hero,
  ): Promise<void> {
    await this.heroRepository.updateById(id, hero);
  }

  @put('/heroes/{id}')
  @response(204, {
    description: 'Hero PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hero: Hero,
  ): Promise<void> {
    await this.heroRepository.replaceById(id, hero);
  }

  @del('/heroes/{id}')
  @response(204, {
    description: 'Hero DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.heroRepository.deleteById(id);
  }
  @get('/heroes/{id}/friend', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Hero}}},
      },
    },
  })
  async getFriend(
    @param.path.number('id') heroId: typeof Hero.prototype.id,
  ): Promise<Hero> {
    return await this.heroRepository.friend(heroId);
  }

  @get('/heroes/{id}/planet', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Planet}}},
      },
    },
  })
  async getPlanet(
    @param.path.number('id') heroId: typeof Hero.prototype.id,
  ): Promise<Planet> {
    return await this.heroRepository.planet(heroId);
  }

  @get('/heroes/{id}/species', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Species}}},
      },
    },
  })
  async getSpecies(
    @param.path.number('id') heroId: typeof Hero.prototype.id,
  ): Promise<Species> {
    return await this.heroRepository.species(heroId);
  }
}
