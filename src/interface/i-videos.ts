import { Prisma, Videos } from '@prisma/client'

export interface IVideos {
    create(data: Prisma.VideosCreateInput): Promise<Videos>
    findByUrl(url: string): Promise<Videos | null>
}