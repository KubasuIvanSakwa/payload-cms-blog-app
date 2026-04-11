import { Article } from '@/payload-types'
import { slugify } from 'payload/shared'
import type { FieldHook } from 'payload'

export const generateSlugHook: FieldHook<Article, string> = ({ value, data }) => {
  if (value) return slugify(value.trim()) || ''
  return slugify(data?.title?.trim() || '') || ''
}