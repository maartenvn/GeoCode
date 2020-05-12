export class AuthRegisterWrapper {
    public username: string;
    public email: string;
    public password: string;
    public passwordRepeat: string;
}

export class AuthLoginWrapper {
    public email: string;
    public password: string;
}

export class AuthPasswordUpdateWrapper {
    public oldPassword: string;
    public password: string;
    public passwordRepeat: string;
}
