import { Media } from '@/payload-types'
import { slugify } from 'payload/shared'
import type { FieldHook } from 'payload'

export const generateAltHook: FieldHook<Media> = ({ value, data }) => {
    if (value) return slugify(value.trim()) || ''
    return slugify(data?.filename || '') || ''
}