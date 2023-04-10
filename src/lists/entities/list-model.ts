import {
  Column,
  Model,
  AutoIncrement,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { List } from './list.entity';

@Table
export class ListModel extends Model<List> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;
}
