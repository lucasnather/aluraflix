import { Categories, Prisma } from '@prisma/client'

export interface FindProps {
    title: string
    color: string
}

export interface ICategories {
    create(data: Prisma.CategoriesCreateInput): Promise<Categories>
    findByTitleAndColor(data: FindProps): Promise<Categories |  null>
    findAll(): Promise<Categories[] | null>
    findById(id: number): Promise<Categories | null>
    updateById(data: Prisma.CategoriesUncheckedUpdateInput, id: number): Promise<Categories>
    deleteById(id: number): Promise<void>
}