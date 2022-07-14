import { service } from '@/api/config'

export const saveSpace: (space: SpaceModel.Space) => Promise<{ code: number, data: any }> = (space: SpaceModel.Space) => service.post('/space/saveSpace', space)
// export const batchAdd: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/space/batchAdd', { id })
export const deleteSpaceById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/space/deleteSpaceById', { id })
export const getSpaceById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/space/getSpaceById', { id })
export const getSpaceWithGoodsById: (id: string) => Promise<{ code: number, data: any }> = (id: string) => service.post('/space/getSpaceWithGoodsById', { id })
export const getPage: (query: SpaceModel.Query) => Promise<{ code: number, data: any }> = (query: SpaceModel.Query) => service.post('/space/getPage', { query })
