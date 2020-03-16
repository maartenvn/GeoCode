import Vue from "vue";
import ErrorMixin from "./error/errormixin";

declare const grecaptcha: any;

/**
 * Execute the captcha.
 * @param action Action to pass to the backend captcha handler.
 */
export function executeCaptcha(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
        grecaptcha.ready(() => {
            try {
                grecaptcha
                    .execute(process.env.VUE_APP_RECAPTCHA_KEY, {
                        action
                    })
                    .then((token: string) => {
                        resolve(token);
                    });
            } catch (error) {
                // Captcha failed to load. Throw an error.
                new ErrorMixin().$error(
                    {
                        message: "Unable to progress captcha. Try again later.",
                        stacktrace: error
                    },
                    {
                        style: "SNACKBAR",
                        id: action,
                        displayConsole: true
                    }
                );

                reject(error);
            }
        });
    });
}
