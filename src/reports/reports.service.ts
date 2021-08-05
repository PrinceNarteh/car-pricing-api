import { Body, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  getReports() {
    return 'Get All Reports';
  }

  createReports(@Body() createReportDto: CreateReportDto) {
    return createReportDto;
  }

  updateReport() {
    return 'Report Updated.';
  }
}
