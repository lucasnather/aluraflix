import { FindProps, ICategories } from '@/interface/i-categories'
import { Categories, Prisma } from '@prisma/client'
//import { randomUUID } from 'node:crypto'

export class InMemoryCategoriesRepository implements ICategories {

	private categories: Categories[] = []
	private id = 0

	async create(data: Prisma.CategoriesCreateInput){
		this.id++

		const category: Categories = {
			id: this.id,
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

	async findAll() {
		if(this.categories.length === 0) return null

		return this.categories
	}

	async findById(id: number) {
		const category = this.categories.find(category => category.id === id)

		if(!category) return null

		return category
	}

	async updateById(data: Prisma.CategoriesUncheckedUpdateInput, id: number) {
		const indexCategory = this.categories.findIndex(category => category.id === data.id)
		const category = this.categories.find(category => category.id === data.id)

		if(!category) return null

		this.categories[indexCategory] = {
			title: data.title == undefined ? category.title : data.title,
			color: data.color == undefined ? category.color : data.color,
			id: id,
			createdAt: category.createdAt
		}

		return this.categories[indexCategory]

	}

	async deleteById(id: number) {
		const indexCategory = this.categories.findIndex(category => category.id === id)

		this.categories.splice(1, indexCategory)
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