import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto ) {
        return this.coffeesService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const coffee = this.coffeesService.findOne(id);

        if (!coffee) {
            // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        
        return this.coffeesService.create(createCoffeeDto)
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }

}
