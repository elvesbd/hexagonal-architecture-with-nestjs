import { Injectable } from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { List } from '../entities/list.entity';
import { ListGateway } from '../gateways/list-gateway.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListAdapterHttp implements ListGateway {
  constructor(private readonly httpService: HttpService) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.post<List>('lists', {
        name: createListDto.name,
      }),
    );
    return data;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<List[]>('lists'));
    return data;
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.get<List>(`lists/${id}`),
    );
    return data;
  }
}
