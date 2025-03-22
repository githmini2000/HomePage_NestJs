import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers() {
    return this.customerService.getCustomers();
  }

  @Post()
  async createCustomer(@Body() customerData: any) {
    return this.customerService.createCustomer(customerData);
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(@UploadedFile() file: Express.Multer.File) {
    return this.customerService.bulkUploadCustomers(file);
  }
}
