import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MasterDataService } from '../services/master_data.service';
import { Company } from '../models/company.class';

@Controller('master-data')
export class MasterDataController {
  private readonly logger = new Logger(MasterDataController.name);
  constructor(private readonly masterDataService: MasterDataService) {}

  //#region Company
  @Get('getAllCompany')
  getAllCompany(
    @Query()
    query: {
      keywords: string;
      limit: number;
      offset: number;
    },
  ) {
    this.logger.log('GET all Company');
    return this.masterDataService.getAllCompany(
      query.keywords,
      query.limit,
      query.offset,
    );
  }
  @Post('createCompany')
  createCompany(@Body() Company: Company): any {
    this.logger.log('Create Company');
    return this.masterDataService.createCompany(Company);
  }

  @Post('updateCompany')
  updateCompany(@Body() Company: Company): any {
    this.logger.log('Update Company');
    return this.masterDataService.updateCompany(Company);
  }

  @Get('getCompanyById/:id')
  getCompanyById(@Param('id') id: string): any {
    this.logger.log('get Company By Id');
    const CompanyId = parseInt(id);
    return this.masterDataService.getCompanyById(CompanyId);
  }

  @Post('deleteCompanyById')
  deleteCompanyById(@Body() data): any {
    this.logger.log('delete Company By Ids');
    return this.masterDataService.deleteCompanyById(data.Ids);
  }
  //#endregion

}