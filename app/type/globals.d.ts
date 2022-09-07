declare namespace Express {
    export interface Request {
        username?: string,
        body: {
            firstName: string
        }
    }
}
