import { env } from './../../lib/env';
import { getPayload } from "payload";
import config from '@/payload.config'
import { isDuplicateError } from "../lib/is-duplicate-error";

export async function seedAdmin() {
    const payload = await getPayload({ config })

    try {
        const response = await payload.create({
            collection: "users",
            data: {
                email: env.ADMIN_EMAIL || ' ',
                password: env.ADMIN_PASSWORD || '',
            }
        })
        console.log("Admin user created:", response)
    } catch (error) {
        if(isDuplicateError(error, 'email')) {
            console.log("Admin User already exists")
        } else console.log(JSON.stringify(error))
    }
}