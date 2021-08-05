import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getReports() {
    return this.reportsService.getReports();
  }

  @Post()
  createReports(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.createReports(createReportDto);
  }

  @Patch()
  updateReport() {
    return this.reportsService.updateReport();
  }
}
