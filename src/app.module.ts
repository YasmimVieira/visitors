import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitorsModule } from './visitors/visitors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigSchema, ConfigType } from './visitors/config/config.typed';
import { Visitor } from './visitors/entities/visitor.entity';
import { typeOrmConfig } from './visitors/config/database.config';
import { appConfig } from './visitors/config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigType>) => ({
        ...configService.get('database'),
        entities: [Visitor],
      })
    }),
    ConfigModule.forRoot({
      load: [typeOrmConfig, appConfig],
      validationSchema: appConfigSchema,
      validationOptions: { abortEarly: true },
    }),
    VisitorsModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
