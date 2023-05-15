export default abstract class SocialLogin {

    private readonly _callBack: Function;

    constructor(value: Function) {
        this._callBack = value
    }

    public get callBack(): Function {
        return this._callBack
    }

    abstract init(): void
    abstract login(): void
    abstract logout(): void

}
