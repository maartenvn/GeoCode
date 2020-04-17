import { Icon, Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import GestureHandling from "leaflet-gesture-handling";

delete (Icon.Default.prototype as any)._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
