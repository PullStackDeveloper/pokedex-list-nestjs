import { AbilityDto } from './ability.dto';
import { MoveDto } from './move.dto';
import { StatDto } from './stat.dto';
import { TypeDto } from './type.dto';

export class PokemonDto {
  id: number;
  name: string;
  image: string;
  sprites: {
    front_default: string | null;
    back_default: string | null;
  };
  abilities: AbilityDto[];
  moves: MoveDto[];
  stats: StatDto[];
  types: TypeDto[];
}
