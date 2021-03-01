export class UserLogado {
    constructor(
        public token?: string,
        public user?: any,
        public roles?: string[]
    ) { }
}