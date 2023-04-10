import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { CreateListDto } from '../dto/create-list.dto';
import { of } from 'rxjs';
import { ListGateway } from '../gateways/list-gateway.interface';
import { NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';
import { ListCreatedEvent } from '../events/list-created.event';

describe('ListsService', () => {
  let sut: ListsService;
  let listAdapterSequelize: ListGateway;
  let listAdapterHttp: ListGateway;
  // let eventEmitter: EventEmitter;

  const list = {
    id: 1,
    name: 'My List',
  };

  const result = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    const ListAdapterSequelizeProvider = {
      provide: 'LIST_ADAPTER_SEQUELIZE',
      useValue: {
        create: jest.fn().mockResolvedValue(list),
        findAll: jest.fn().mockResolvedValue([list]),
        findById: jest.fn().mockResolvedValue(list),
      },
    };

    const ListAdapterHttpProvider = {
      provide: 'LIST_ADAPTER_HTTP',
      useValue: {
        create: jest.fn().mockReturnValue(of(result)),
      },
    };

    /* const EventEmitterProvider = {
      provide: 'EVENT_EMITTER',
      useValue: {
        emit: jest.fn(),
      },
    }; */

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        ListAdapterSequelizeProvider,
        ListAdapterHttpProvider,
        // EventEmitterProvider,
      ],
    }).compile();

    sut = module.get<ListsService>(ListsService);
    listAdapterSequelize = module.get<ListGateway>('LIST_ADAPTER_SEQUELIZE');
    listAdapterHttp = module.get<ListGateway>('LIST_ADAPTER_HTTP');
    // eventEmitter = module.get<EventEmitter>('EVENT_EMITTER');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(listAdapterSequelize).toBeDefined();
    expect(listAdapterHttp).toBeDefined();
    // expect(eventEmitter).toBeDefined();
  });

  describe('create()', () => {
    const createListDto: CreateListDto = {
      name: 'My List',
    };

    it('should be call listAdapterSquelize.create with correct value', async () => {
      await sut.create(createListDto);
      expect(listAdapterSequelize.create).toHaveBeenCalledTimes(1);
      expect(listAdapterSequelize.create).toHaveBeenCalledWith(createListDto);
    });

    it('should be call listAdapterHttp.create with correct value', async () => {
      await sut.create(createListDto);
      expect(listAdapterHttp.create).toHaveBeenCalledTimes(1);
      expect(listAdapterHttp.create).toHaveBeenCalledWith(createListDto);
    });

    /* it('should be call eventEmitter.emit with correct value', async () => {
      await sut.create(createListDto);
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'list.created',
        new ListCreatedEvent(list),
      );
    }); */

    it('should be create an list with success', async () => {
      const result = await sut.create(createListDto);
      expect(result).toStrictEqual(list);
    });
  });

  describe('findAll()', () => {
    it('should be call listAdapterSquelize.findAll with correct value', async () => {
      await sut.findAll();
      expect(listAdapterSequelize.findAll).toHaveBeenCalledTimes(1);
      expect(listAdapterSequelize.findAll).toHaveBeenCalledWith();
    });

    it('should be return an lists with success', async () => {
      const result = await sut.findAll();
      expect(result).toStrictEqual([list]);
    });
  });

  describe('findOne()', () => {
    const id = 1;

    it('should be call listAdapterSquelize.findOne with correct value', async () => {
      await sut.findOne(id);
      expect(listAdapterSequelize.findById).toHaveBeenCalledTimes(1);
      expect(listAdapterSequelize.findById).toHaveBeenCalledWith(1);
    });

    it('should be return an exception if list not found', async () => {
      jest
        .spyOn(listAdapterSequelize, 'findById')
        .mockResolvedValueOnce(undefined);

      await expect(sut.findOne(id)).rejects.toThrow(NotFoundException);
    });

    it('should be return an list with success', async () => {
      const result = await sut.findOne(id);
      expect(result).toStrictEqual(list);
    });
  });
});
