import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>) { }

  async findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = await this.coffeeRepository.create(createCoffeeDto);
    return await this.coffeeRepository.save(coffee);

  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    })

    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }

    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }
}
