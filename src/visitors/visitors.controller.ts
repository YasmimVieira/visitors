import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';

@ApiTags('Visitors')
@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo visitante', 
    description: 'Cria um novo registro de visitante no sistema'
  })
  @ApiBody({ 
    type: CreateVisitorDto,
    examples: {
      example1: {
        value: {
          name: 'João Silva',
          email: 'joao@example.com',
          phone: '(11) 98765-4321'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Visitante criado com sucesso',
    type: Visitor
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  create(@Body() createVisitorDto: CreateVisitorDto) {
    return this.visitorsService.create(createVisitorDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os visitantes', 
    description: 'Retorna uma lista completa de todos os visitantes cadastrados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de visitantes retornada com sucesso',
    type: [Visitor]
  })
  findAll() {
    return this.visitorsService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ 
  //   summary: 'Obter visitante por ID', 
  //   description: 'Retorna os detalhes de um visitante específico'
  // })
  // @ApiParam({ 
  //   name: 'id', 
  //   type: 'number',
  //   description: 'ID único do visitante',
  //   example: 1
  // })
  // @ApiResponse({ 
  //   status: 200, 
  //   description: 'Visitante encontrado',
  //   type: Visitor
  // })
  // @ApiResponse({ 
  //   status: 404, 
  //   description: 'Visitante não encontrado'
  // })
  // findOne(@Param('id') id: string) {
  //   return this.visitorsService.findOne(id);
  // }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Deletar visitante', 
    description: 'Remove um visitante do sistema'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID único do visitante',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Visitante deletado com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Visitante não encontrado'
  })
  remove(@Param('id') id: string) {
    return this.visitorsService.remove(id);
  }
}
