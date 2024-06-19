import { Module } from '@nestjs/common';

import { MapperService } from './application/mapper/mapper.service';
import { UtilsService } from './infrastructure/utils/utils.service';

@Module({
  providers: [MapperService, UtilsService],
  exports: [MapperService, UtilsService],
})
export class CommonModule {}
