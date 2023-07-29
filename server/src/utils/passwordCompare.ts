import bcrypt from 'bcrypt'

export async function passwordCompare(userpassword: string, candaditepassword: string) {
    return await bcrypt.compare(userpassword, candaditepassword).catch((e) => false)
}