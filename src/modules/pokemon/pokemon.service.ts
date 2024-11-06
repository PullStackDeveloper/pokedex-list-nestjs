import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonDto } from './dtos/pokemon.dto';
import { AbilityDto } from './dtos/ability.dto';
import { MoveDto } from './dtos/move.dto';
import { StatDto } from './dtos/stat.dto';
import { TypeDto } from './dtos/type.dto';
import { NamedAPIResourceDto } from './dtos/named-api-resource.dto';
import { VersionGroupDetailDto } from './dtos/version-group-detail.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  // Base API URL for accessing Pokémon data
  private readonly apiUrl: string;
  private readonly imageUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.imageUrl = this.configService.get<string>('IMAGE_URL');
  }

  /**
   * Returns a paginated list of Pokémon with basic information.
   * @param offset - The starting index of the Pokémon list.
   * @param limit - The maximum number of Pokémon to retrieve.
   */
  async getPokemonList(offset: number, limit: number) {
    const response = await firstValueFrom(
      this.httpService.get(this.apiUrl, { params: { offset, limit } }),
    );

    // Maps each Pokémon in the list to a simple structure, returning only id, name, and image URL
    return response.data.results.map((pokemon: any) => ({
      id: this.extractIdFromUrl(pokemon.url),
      name: pokemon.name,
      image: `${this.imageUrl}/${this.extractIdFromUrl(pokemon.url)}.png`,
    }));
  }

  /**
   * Returns complete details of a Pokémon by its ID.
   * @param id - The ID of the Pokémon to retrieve.
   */
  async getPokemonById(id: number): Promise<PokemonDto> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/${id}`),
    );
    const pokemonData = response.data;

    // Instantiates a new PokemonDto and populates it with detailed data
    const pokemonDto = new PokemonDto();
    pokemonDto.id = pokemonData.id;
    pokemonDto.name = pokemonData.name;
    pokemonDto.image = pokemonData.sprites.front_default;
    pokemonDto.sprites = {
      front_default: pokemonData.sprites.front_default,
      back_default: pokemonData.sprites.back_default,
    };

    // Maps abilities data to AbilityDto objects
    pokemonDto.abilities = pokemonData.abilities.map((ability: any) => {
      const abilityDto = new AbilityDto();
      abilityDto.is_hidden = ability.is_hidden;
      abilityDto.slot = ability.slot;

      const namedAbility = new NamedAPIResourceDto();
      namedAbility.name = ability.ability.name;
      namedAbility.url = ability.ability.url;
      abilityDto.ability = namedAbility;

      return abilityDto;
    });

    // Maps moves data to MoveDto objects, each containing move details and version-specific info
    pokemonDto.moves = pokemonData.moves.map((move: any) => {
      const moveDto = new MoveDto();

      const namedMove = new NamedAPIResourceDto();
      namedMove.name = move.move.name;
      namedMove.url = move.move.url;
      moveDto.move = namedMove;

      moveDto.version_group_details = move.version_group_details.map(
        (detail: any) => {
          const versionGroupDetailDto = new VersionGroupDetailDto();
          versionGroupDetailDto.level_learned_at = detail.level_learned_at;

          const moveLearnMethod = new NamedAPIResourceDto();
          moveLearnMethod.name = detail.move_learn_method.name;
          moveLearnMethod.url = detail.move_learn_method.url;
          versionGroupDetailDto.move_learn_method = moveLearnMethod;

          const versionGroup = new NamedAPIResourceDto();
          versionGroup.name = detail.version_group.name;
          versionGroup.url = detail.version_group.url;
          versionGroupDetailDto.version_group = versionGroup;

          return versionGroupDetailDto;
        },
      );

      return moveDto;
    });

    // Maps stats data to StatDto objects, including base stats and efforts
    pokemonDto.stats = pokemonData.stats.map((stat: any) => {
      const statDto = new StatDto();
      statDto.base_stat = stat.base_stat;
      statDto.effort = stat.effort;

      const namedStat = new NamedAPIResourceDto();
      namedStat.name = stat.stat.name;
      namedStat.url = stat.stat.url;
      statDto.stat = namedStat;

      return statDto;
    });

    // Maps types data to TypeDto objects, which contain type details
    pokemonDto.types = pokemonData.types.map((type: any) => {
      const typeDto = new TypeDto();
      typeDto.slot = type.slot;

      const namedType = new NamedAPIResourceDto();
      namedType.name = type.type.name;
      namedType.url = type.type.url;
      typeDto.type = namedType;

      return typeDto;
    });

    return pokemonDto; // Returns the fully populated Pokémon data transfer object (DTO)
  }

  /**
   * Extracts the ID of a Pokémon from its URL.
   * @param url - The URL containing the Pokémon ID.
   * @returns The Pokémon ID as a number.
   */
  private extractIdFromUrl(url: string): number {
    const segments = url.split('/'); // Splits the URL by slashes
    return Number(segments[segments.length - 2]); // Returns the second last segment as the ID
  }
}
