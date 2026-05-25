import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';

describe('VisitorsService', () => {
  let service: VisitorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorsService],
    }).compile();

    service = module.get<VisitorsService>(VisitorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a visitor', () => {
    const dto: CreateVisitorDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-1234',
    };

    const visitor = service.create(dto);

    expect(visitor).toHaveProperty('id');
    expect(visitor).toMatchObject({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    });
    expect(service.findAll()).toContainEqual(visitor);
  });

  it('should find one visitor by id', () => {
    const dto: CreateVisitorDto = {
      name: 'Alice',
      email: 'alice@example.com',
      phone: '111-2222',
    };

    const created = service.create(dto);
    const found = service.findOne(created.id);

    expect(found).toEqual(created);
  });

  it('should remove a visitor', () => {
    const a = service.create({ name: 'A', email: 'a@example.com', phone: '1' });
    const b = service.create({ name: 'B', email: 'b@example.com', phone: '2' });

    expect(service.findAll()).toHaveLength(2);

    service.remove(a.id);

    expect(service.findOne(a.id)).toBeUndefined();
    expect(service.findAll()).toHaveLength(1);
    expect(service.findAll()).toContainEqual(b);
  });
});
