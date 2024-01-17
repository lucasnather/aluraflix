import { FindProps, ICategories } from '@/interface/i-categories'
import { Categories, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCategoriesRepository implements ICategories {

	private categories: Categories[] = []

	async create(data: Prisma.CategoriesCreateInput){
		const category: Categories = {
			id: data.id ?? randomUUID(),
			title: this.validateTitle(data.title),
			color: this.validateColor(data.color),
			createdAt: new Date()
		}

		this.categories.push(category)

		return category
	}

	async findByTitleAndColor({title, color}: FindProps){
		const category = this.categories.find(category => {
			category.color === color || category.title === title
		})

		if(!category) return null

		return category
	}

	private validateTitle(title: string) {
		if(title.length === 0) {
			throw new Error('')
		}

		return title
	}

	private validateColor(color: string) {
		if(color.length === 0) {
			throw new Error('')
		}

		return color
	}

}