import { CreateListDto } from '../dto/create-list.dto';
import { List } from '../entities/list.entity';

export interface ListGateway {
  create(createListDto: CreateListDto): Promise<List>;
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List>;
}
