"use client";
const eventEmitter = {
  listeners: new Map(),
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      // Return a cleanup function to remove this specific callback
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        this.listeners.set(
          event,
          callbacks.filter((cb) => cb !== callback)
        );
      }
    };
  },
  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => callback(...args));
    }
  },
};

export default eventEmitter;