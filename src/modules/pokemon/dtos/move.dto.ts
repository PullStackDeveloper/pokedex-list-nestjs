import { NamedAPIResourceDto } from './named-api-resource.dto';
import { VersionGroupDetailDto } from './version-group-detail.dto';

export class MoveDto {
  move: NamedAPIResourceDto;
  version_group_details: VersionGroupDetailDto[];
}
