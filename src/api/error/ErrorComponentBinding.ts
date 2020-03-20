import { Component } from "vue";
import ErrorComponentPayload from "./ErrorComponentPayload";

/**
 * Component that will be used to update & pass error components & payload to another Vue component.
 */
export default class ErrorComponentBinding {
    /**
     * Component to render when an error occurs.
     */
    public component: Component;

    /**
     * Payload to pass to the component.
     */
    public payload: ErrorComponentPayload;
}
