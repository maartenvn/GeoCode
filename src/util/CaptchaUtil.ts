import { ErrorHandler } from "@/api/error/ErrorHandler";
import { EchoError } from "echofetch";

declare const grecaptcha: any;

/**
 * Execute the captcha.
 * @param action Action to pass to the backend captcha handler.
 */
export class CaptchaUtil {
    static execute(action: string) {
        return new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                try {
                    grecaptcha
                        .execute(process.env.VUE_APP_RECAPTCHA_KEY, {
                            action,
                        })
                        .then((token: string) => {
                            resolve(token);
                        });
                } catch (err) {
                    // Captcha failed to load. Throw an error.
                    const error: EchoError = {
                        message: "Unable to progress captcha. Try again later.",
                        name: "Captcha Error",
                        config: {},
                        isAxiosError: false,
                        toJSON: () => new Object(),
                    };

                    ErrorHandler.handle(error, {
                        style: "SNACKBAR",
                        id: action,
                        displayConsole: true,
                    });

                    reject(error);
                }
            });
        });
    }
}
