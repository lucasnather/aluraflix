import { Prisma, Videos } from '@prisma/client'

export interface IVideos {
    create(data: Prisma.VideosCreateInput): Promise<Videos>
    findByUrl(url: string): Promise<Videos | null>
    findById(id: string): Promise<Videos | null>
    deleteById(id: string): Promise<void>
    findAll(): Promise<Videos[]>
}