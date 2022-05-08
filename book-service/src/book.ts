import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export default class Book {
    @IsOptional()
    id?: number
    @IsString()
    title: string
    @IsString()
    author: string
    @IsNumber()
    score: number
    @IsString()
    description: string
    @IsDate()
    releaseDate: Date

    constructor(partial: Partial<Book>) {
        Object.assign(this, partial);
    }
}