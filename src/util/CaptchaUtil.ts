import { ErrorHandler } from "@/api/error/ErrorHandler";
import { EchoError } from "echofetch";
import { load } from "recaptcha-v3";

/**
 * Execute the captcha.
 * @param action Action to pass to the backend captcha handler.
 */
export class CaptchaUtil {
    /**
     * Execute the captcha with the given action.
     * @param action
     */
    static execute(action: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                load(process.env.VUE_APP_RECAPTCHA_KEY).then((recaptcha) => {
                    recaptcha.execute(action).then((token) => {
                        resolve(token);
                    });
                });
            } catch (err) {
                // Captcha failed to load. Throw an error.
                const error = {
                    message: "Unable to progress captcha. Try again later.",
                    name: "Captcha Error",
                } as EchoError;

                ErrorHandler.handle(error, {
                    style: "SNACKBAR",
                    id: action,
                    displayConsole: true,
                });

                reject(error);
            }
        });
    }
}
