import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { faker } from '@faker-js/faker';

const indianFirstNames = ['Aarav', 'Vivaan', 'Aditya', 'Ishaan', 'Krishna', 'Rohan', 'Aryan', 'Saanvi', 'Anaya', 'Diya', 'Meera', 'Kavya'];
const indianLastNames = ['Sharma', 'Verma', 'Gupta', 'Reddy', 'Patel', 'Singh', 'Kumar', 'Das', 'Mehta', 'Joshi'];

@Injectable()
export class ProviderSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

    async onApplicationBootstrap() {
      const categories = await this.categoryRepo.find();

      for (const category of categories) {
        for (let i = 1; i <= 5; i++) {
          const first_name = faker.helpers.arrayElement(indianFirstNames);
          const last_name = faker.helpers.arrayElement(indianLastNames);
          const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}+${i}@example.com`;

          const exists = await this.providerRepo.findOne({ where: { email } });
          if (!exists) {
            const provider = this.providerRepo.create({
              first_name,
              last_name,
              email,
              phone_number: `99900000${i}`,
              password_hash: faker.internet.password({ length: 10 }),
              category,
              work_start_time: '09:00',
              work_end_time: '18:00',
              slot_duration_mins: 30,
              charges_per_slot_rupee: faker.number.int({ min: 150, max: 500 }),
            });

            await this.providerRepo.save(provider);
          }
        }
      }
    }
}
