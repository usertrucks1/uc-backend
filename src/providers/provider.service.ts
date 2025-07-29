import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.entity';
import { Repository } from 'typeorm';
import { GetProvidersQueryDto } from './provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,
  ) { }

  async getAllProviders(query: GetProvidersQueryDto) {
    const { search, page, limit, category_id } = query;

    const queryBuilder = this.providerRepo
      .createQueryBuilder('provider')
      .leftJoinAndSelect('provider.category', 'category') // fetch category details
      .orderBy('provider.id', 'ASC');

    if (category_id) {
      queryBuilder.andWhere('provider.category_id = :category_id', { category_id });
    }


    if (search) {
      queryBuilder.andWhere(
        'provider.first_name ILIKE :search OR provider.last_name ILIKE :search',
        { search: `%${search}%` }
      );
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.take(limit).skip(skip);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page: limit ? page : 1,
      limit: limit ?? total,
    };
  }


}
