import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  createRecordPayloadSchema,
  updateRecordPayloadSchema,
  searchRecordsQuerySchema,
} from 'src/validation-schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async searchRecords(@Query() query) {
    searchRecordsQuerySchema.validateSync(query);

    const records = await this.appService.searchRecords(query);

    return records;
  }

  @Get('/boxes')
  async getBoxes() {
    const boxes = await this.appService.getBoxes();

    return boxes;
  }

  @Get('/catalogs')
  async getCatalogs() {
    const catalogs = await this.appService.getCatalogs();

    return catalogs;
  }

  @Post()
  async createRecord(@Body() payload) {
    createRecordPayloadSchema.validateSync(payload);

    const record = await this.appService.createRecord(payload);

    return record;
  }

  @Patch(':recordId')
  async updateRecord(@Param('recordId') recordId, @Body() payload) {
    updateRecordPayloadSchema.validateSync(payload);

    const record = await this.appService.updateRecord(recordId, payload);

    return record;
  }

  @Delete(':recordId')
  async deleteRecord(@Param('recordId') recordId) {
    await this.appService.deleteRecord(recordId);

    return {
      status: 'ok',
    };
  }
}
