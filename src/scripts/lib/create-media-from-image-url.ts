import { Payload } from 'payload';
import { faker } from "@faker-js/faker"
import { slugify } from 'node_modules/zod/v4/core/util.cjs';

export async  function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
    try {    
        const res = await fetch(imageUrl)
        const arrBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrBuffer)
    
        const mimetype = res.headers.get('content-type') || 'image/jpeg'
        const filesize = buffer.length
        const filename = res.url.split('/').pop()?.split('?')[0]

        if(!filename) throw new Error('Failed to extract filename')

        return await payload.create({
            collection: 'media',
            draft: true,
            data: { alt: slugify(filename || '') || faker.lorem.words(3) },
            file: {
                data: buffer,
                name: filename,
                mimetype,
                size: filesize
            }
        })
        
    } catch(e) {
        console.warn('Failed to seed media file', e)
    }
}