import { Prisma, Videos } from '@prisma/client'

export interface IVideos {
    create(data: Prisma.VideosUncheckedCreateInput): Promise<Videos>
    findByUrl(url: string): Promise<Videos | null>
    findById(id: string): Promise<Videos | null>
    updateById(data: Prisma.VideosUncheckedUpdateInput ,id: string): Promise<Videos | null>
    deleteById(id: string): Promise<void>
    findAll(): Promise<Videos[]>
    findByCategoryId(categoryId: number): Promise<Videos[] | null>
}