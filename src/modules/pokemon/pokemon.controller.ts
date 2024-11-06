import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './dtos/pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemons(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<PokemonDto[]> {
    return this.pokemonService.getPokemonList(offset, limit);
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: number): Promise<PokemonDto> {
    return this.pokemonService.getPokemonById(id);
  }
}
