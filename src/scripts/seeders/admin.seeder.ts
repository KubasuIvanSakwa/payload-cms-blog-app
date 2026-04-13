import { env } from './../../lib/env';
import { isDuplicateError } from "../lib/is-duplicate-error";
import { Payload } from 'payload';

export async function seedAdmin(payload: Payload) {
    try {
        const response = await payload.create({
            collection: "users",
            data: {
                email: env.CMS_SEED_ADMIN_EMAIL || ' ',
                password: env.CMS_SEED_ADMIN_PASSWORD || '',
            }
        })
        console.log("Admin user created:", response)
    } catch (error) {
        if(isDuplicateError(error, 'email')) {
            console.log("Admin User already exists")
        } else console.log(JSON.stringify(error))
    }
}