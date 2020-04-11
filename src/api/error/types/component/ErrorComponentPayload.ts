/**
 * Payload that will be passed to the component specified in the error component binding.
 */
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";

export class ErrorComponentPayload {
    /**
     * Error Value
     */
    public error: EchoError;

    /**
     * Error Description
     */
    public description: string;

    /**
     * Error Options
     */
    public options: CustomErrorOptions;
}
