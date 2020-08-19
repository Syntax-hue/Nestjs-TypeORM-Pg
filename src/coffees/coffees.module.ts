import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event])
    ],
    controllers: [CoffeesController],
    providers: [CoffeesService,
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService // class provider
        },
        // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }], // with useValue
        {
            provide: COFFEE_BRANDS,
            useFactory: (): string[] => ['buddy brew', 'nescafe'],
            // useFactory: async (connection: Connection): Promise<string> => {
            //   const coffeeBrands = await connection.query('SELECT * ...');          // example of async provider
            //   const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']) // this will fire first, see the second in service
            //   return coffeeBrands;  
            // }
        }
    ], // with useFactory factory provider
    exports: [CoffeesService],
})
export class CoffeesModule { }
