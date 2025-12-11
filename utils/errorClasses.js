
export class NotFound extends Error {
    constructor(message = 'Not Found') {
        super(message)
        this.name = 'NotFound'
        this.status= 404
    }
}

export class InvalidData extends Error {
    contructor(message, field) {
        super(message)
        this.name = 'InvalidData'
        this.status = 400
        this.field = field
    }
}

export class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.name = 'Unauthorized'
        this.status = 401
    }
}