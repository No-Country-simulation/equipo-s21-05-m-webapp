import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IncomingMessage } from 'http';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Req() req: IncomingMessage, @Body() createBookDto: CreateBookDto) {
    //create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto, req);
  }

  @Get()
  @ApiQuery({
    name: 'quantity',
    required: false,
    type: Number,
    description: 'Número de libros a devolver (opcional)',
  })
  findAll(@Query('quantity') quantity?: number) {
    return this.booksService.findAll(quantity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
