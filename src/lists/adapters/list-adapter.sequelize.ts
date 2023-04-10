import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateListDto } from '../dto/create-list.dto';
import { ListModel } from '../entities/list-model';
import { List } from '../entities/list.entity';
import { ListGateway } from '../gateways/list-gateway.interface';

@Injectable()
export class ListAdapterSequelize implements ListGateway {
  constructor(
    @InjectModel(ListModel)
    private readonly listModel: typeof ListModel,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    return await this.listModel.create(createListDto);
  }

  async findAll(): Promise<List[]> {
    return await this.listModel.findAll();
  }

  async findById(id: number): Promise<List> {
    const list = await this.listModel.findByPk(id);
    if (!list) throw new NotFoundException();
    return list;
  }
}
