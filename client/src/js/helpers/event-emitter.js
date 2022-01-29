class EventEmitter {
    constructor() {
        this.events = {};
        this.unsubscribers = {};
    }

    // Pass "key" string, if autounsubscribe before repeated subscribe needed
    on(event, cb, key = null) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        if (key !== null && this.unsubscribers[key]) {
            this.unsubscribers[key]();
        }

        this.events[event].push(cb);

        const unsubscriber = () => {
            this.events[event] = this.events[event].filter(
                (callbacks) => callbacks !== cb
            );
        };

        if (key !== null) {
            this.unsubscribers[key] = unsubscriber;
        }

        return unsubscriber;
    }

    emit(event, payload) {
        if (!this.events[event]) {
            return;
        }

        this.events[event].forEach((cb) => {
            cb(payload);
        });
    }
}

export const ee = new EventEmitter();
