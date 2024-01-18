import { prisma } from '@/database/connection/prisma'
import { FindProps, ICategories } from '@/interface/i-categories'
import { Prisma } from '@prisma/client'

export class CategoriesRepository implements ICategories {

	async create(data: Prisma.CategoriesCreateInput){
		const category = await prisma.categories.create({
			data
		})

		return category
	}

	async findByTitleAndColor(data: FindProps){
		const category = await prisma.categories.findFirst({
			where: {
				OR: [
					{
						title: data.title
					},
					{
						color: data.color
					}
				]
			}
		})

		if(!category) return null

		return category
	}

	async findAll() {
		const category = await prisma.categories.findMany()

		if(category.length == 0) return null

		return category
	}

	async findById(id: number) {
		const category = await prisma.categories.findFirst({
			where: {
				id
			}
		})

		if(!category) return null

		return category
	}

	async updateById(data: Prisma.CategoriesUncheckedUpdateInput, id: number) {
		const category = await prisma.categories.update({
			where: {
				id: id
			},
			data
		})

		return category
	}

	async deleteById(id: number) {
		await prisma.categories.delete({
			where: {
				id
			}
		})
	}


}