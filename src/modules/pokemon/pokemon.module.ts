import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [HttpModule],
})
export class PokemonModule {}
