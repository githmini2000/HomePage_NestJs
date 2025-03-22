import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // create a single customer
  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  // handle bulk upload from CSV
  async bulkUploadCustomers(file: Express.Multer.File): Promise<any> {
    const customers: Partial<Customer>[] = [];
    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;
  
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer.toString('utf-8'));
  
      stream.pipe(csv())
        .on('data', (row) => {

          if (!row.email || !row.name || !row.phone || !row.address) {
            errorCount++;
            return;
          }
  
          const customerData: Partial<Customer> = {
            name: row.name.trim(),
            email: row.email.trim(),
            phone: row.phone.trim(),
            address: row.address.trim(),
          };
  
          customers.push(customerData);
        })
        .on('end', async () => {
          try {
            if (customers.length === 0) {
              return resolve({ success: 0, duplicates: 0, errors: errorCount });
            }
  
            for (const customer of customers) {
              const existingCustomer = await this.customerRepository.findOne({ where: { email: customer.email } });
              if (existingCustomer) {
                duplicateCount++;
                continue;
              }
  
              try {
                await this.customerRepository.save(customer);
                successCount++;
              } catch (error) {
                errorCount++;
              }
            }
  
            resolve({ success: successCount, duplicates: duplicateCount, errors: errorCount });
          } catch (err) {
            reject(err);
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  // get all customers
  async getCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
