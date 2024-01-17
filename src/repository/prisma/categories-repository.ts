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


}