const TouchDetector = ()  => {
    try {
        const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

        const mq = (query) => window.matchMedia(query).matches;

        if ("ontouchstart" in window || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
            return true;
        }

        return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
    } catch (e) {
        console.error("(Touch detect failed)", e);
        return false;
    }
}

export default TouchDetector;