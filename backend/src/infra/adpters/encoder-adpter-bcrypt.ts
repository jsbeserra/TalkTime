import Encoder from "../../domain/encoder";
import { hashSync, compareSync } from 'bcrypt';

export default class EncoderAdpterBcrypt implements Encoder {

    async encode(plain: string): Promise<string> {
        return hashSync(plain, 8)
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return compareSync(plain, hashed)
    }
}