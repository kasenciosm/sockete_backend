import { sign, verify } from "jsonwebtoken";
import config from '../config/authConfig'


export const createToken = (identity) => {
    const { secretKey, accessExpire, refreshExpire } = config

    const accessToken = sign({ identity }, secretKey, {
        expiresIn: accessExpire
    })

    const refreshToken = sign({ identity }, secretKey, {
        expiresIn: refreshExpire
    })

    const userId = identity


    return {
        accessToken,
        refreshToken,
        userId
    }
}

export const verifyToken = (token) => {
    return verify(token, config.secretKey)
}