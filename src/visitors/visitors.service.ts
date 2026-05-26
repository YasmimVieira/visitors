import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './entities/visitor.entity';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorsRepository: Repository<Visitor>,
  ) {}

  create(createVisitorDto: CreateVisitorDto) {
    const visitor = this.visitorsRepository.create(createVisitorDto);
    return this.visitorsRepository.save(visitor);
  }

  findAll() {
    return this.visitorsRepository.find();
  }

  // findOne(id: string) {
  //   const visitor = this.visitorsRepository.findOneBy({ id });
  //   if (!visitor) throw new NotFoundException(`Visitor ${id} not found`);
  //   return visitor;
  // }

  remove(id: string) {
    return this.visitorsRepository.delete(id);
  }
}