"use client";

class NotificationAlert {
  constructor() {
    this.audio = null;
    this.isInitialized = false;
    this.defaultVolume = 0.7;
    this.isMuted = false;
    this.fallbackAudio = null;
    this.audioContext = null;
    this.audioBuffer = null;
    this.supportedFormats = [];
    this.notificationSupport = this.checkNotificationSupport();
    this.audioSupport = this.checkAudioSupport();
  }

  // Check notification API support across browsers
  checkNotificationSupport() {
    if (typeof window === "undefined") return false;

    return {
      native: "Notification" in window,
      permission: "Notification" in window && "permission" in Notification,
      serviceWorker: "serviceWorker" in navigator,
      webkitNotifications: "webkitNotifications" in window,
    };
  }

  // Check audio support and formats
  checkAudioSupport() {
    if (typeof window === "undefined") return {};

    const audio = document.createElement("audio");
    const support = {
      audio: !!audio.canPlayType,
      mp3: audio.canPlayType("audio/mpeg") !== "",
      ogg: audio.canPlayType("audio/ogg") !== "",
      wav: audio.canPlayType("audio/wav") !== "",
      webm: audio.canPlayType("audio/webm") !== "",
      m4a: audio.canPlayType("audio/mp4") !== "",
      webAudio: !!(window.AudioContext || window.webkitAudioContext),
      autoplay: false, // set true after primeAudio runs
    };

    // We skip synthetic autoplay tests; instead we reliably unlock via user gesture.
    return support;
  }

  // Resume AudioContext (Safari/iOS requires a gesture)
  async resumeAudioContext() {
    try {
      if (typeof window === "undefined") return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;

      if (!this.audioContext) {
        this.audioContext = new AC();
      }
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
        // console.log("🎛️ AudioContext resumed");
      }
    } catch (e) {
      console.warn("Could not resume AudioContext:", e);
    }
  }

  // Prime audio on a user gesture to satisfy autoplay policies
  async primeAudio() {
    try {
      await this.initializeAudio();

      // HTML5 Audio primer: muted play then pause
      if (this.audio?.play) {
        this.audio.muted = true;
        this.audio.currentTime = 0;
        await this.audio.play().catch(() => {});
        this.audio.pause();
        this.audio.muted = false;
      }

      // WebAudio primer
      await this.resumeAudioContext();

      this.audioSupport.autoplay = true;
      // console.log("✅ Audio primed");
    } catch (e) {
      console.warn("Audio primer failed:", e);
    }
  }

  // Get best audio format for current browser
  getBestAudioFormat() {
    const formats = [
      { ext: "mp3", mime: "audio/mpeg" },
      { ext: "ogg", mime: "audio/ogg" },
      { ext: "wav", mime: "audio/wav" },
      { ext: "webm", mime: "audio/webm" },
      { ext: "m4a", mime: "audio/mp4" },
    ];

    for (const format of formats) {
      if (this.audioSupport[format.ext]) {
        return format.ext;
      }
    }
    return "mp3"; // fallback
  }

  // Initialize audio with multiple fallbacks
  async initializeAudio() {
    if (this.isInitialized || typeof window === "undefined") return;

    try {
      // Method 1: Try standard HTML5 Audio
      await this.initStandardAudio();

      // Method 2: Try Web Audio API as fallback
      if (!this.audio && this.audioSupport.webAudio) {
        await this.initWebAudio();
      }

      // Method 3: Try multiple audio elements
      if (!this.audio) {
        await this.initMultipleAudio();
      }

      this.isInitialized = true;
      // console.log("✅ Audio initialized successfully");
    } catch (error) {
      console.warn("Could not initialize audio:", error);
      // Create silent fallback
      this.createSilentFallback();
    }
  }

  // Standard HTML5 Audio initialization
  async initStandardAudio() {
    const format = this.getBestAudioFormat();
    const audioPath = `/sounds/notification.${format}`;

    // console.log("🔊 Trying to load audio from:", audioPath);

    this.audio = new Audio(audioPath);
    this.audio.preload = "auto";
    this.audio.volume = this.defaultVolume;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Audio load timeout")),
        5000
      );

      const cleanup = () => {
        clearTimeout(timeout);
        this.audio?.removeEventListener("canplaythrough", onCanPlay);
        this.audio?.removeEventListener("loadeddata", onLoaded);
        this.audio?.removeEventListener("error", onError);
      };

      const onCanPlay = () => {
        cleanup();
        // console.log("✅ Audio loaded successfully");
        resolve();
      };

      const onLoaded = () => {
        cleanup();
        // console.log("✅ Audio data loaded");
        resolve();
      };

      const onError = (e) => {
        cleanup();
        // console.error("❌ Audio load error:", e);
        reject(e);
      };

      this.audio.addEventListener("canplaythrough", onCanPlay);
      this.audio.addEventListener("loadeddata", onLoaded);
      this.audio.addEventListener("error", onError);
    });
  }

  // Web Audio API initialization
  async initWebAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = this.audioContext || new AudioContext();

      const format = this.getBestAudioFormat();
      const response = await fetch(`/sounds/notification.${format}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.audioBuffer = audioBuffer;
    } catch (error) {}
  }

  // Multiple audio elements for better compatibility
  async initMultipleAudio() {
    const formats = ["mp3", "ogg", "wav"];

    for (const format of formats) {
      try {
        const audio = new Audio(`/sounds/notification.${format}`);
        audio.volume = this.defaultVolume;

        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error("Timeout")), 3000);

          const cleanup = () => {
            clearTimeout(timeout);
            audio.removeEventListener("loadeddata", onLoaded);
            audio.removeEventListener("error", onError);
          };

          const onLoaded = () => {
            cleanup();
            this.audio = audio;
            resolve();
          };

          const onError = () => {
            cleanup();
            reject(new Error("Load failed"));
          };

          audio.addEventListener("loadeddata", onLoaded);
          audio.addEventListener("error", onError);
        });

        if (this.audio) break;
      } catch (error) {
        console.warn(`Failed to load ${format}:`, error);
      }
    }
  }

  // Create silent fallback for unsupported browsers
  createSilentFallback() {
    this.audio = {
      play: () => Promise.resolve(),
      pause: () => {},
      currentTime: 0,
      volume: this.defaultVolume,
    };
  }

  // Enhanced permission request with fallbacks
  async requestPermission() {
    if (typeof window === "undefined") return "denied";

    // Modern browsers
    if (
      this.notificationSupport.native &&
      this.notificationSupport.permission
    ) {
      if (Notification.permission === "default") {
        try {
          const permission = await Notification.requestPermission();
          return permission;
        } catch (error) {
          // Very old callback-style API
          return new Promise((resolve) => {
            Notification.requestPermission((permission) => {
              resolve(permission);
            });
          });
        }
      }

      return Notification.permission;
    }

    // Webkit notifications (older Safari)
    if (this.notificationSupport.webkitNotifications) {
      if (window.webkitNotifications.checkPermission() === 1) {
        return new Promise((resolve) => {
          window.webkitNotifications.requestPermission(() => {
            const permission =
              window.webkitNotifications.checkPermission() === 0
                ? "granted"
                : "denied";
            // console.log("🔔 Webkit notification permission:", permission);
            resolve(permission);
          });
        });
      }
      const permission =
        window.webkitNotifications.checkPermission() === 0
          ? "granted"
          : "denied";
      // console.log("🔔 Existing webkit permission:", permission);
      return permission;
    }
  }

  // Request permission but enforce gesture requirement when necessary
  async ensurePermissionInGesture() {
    const status = await this.requestPermission();
    if (status !== "granted") {
      throw new Error("Notification permission not granted");
    }
    return true;
  }

  // Mute/unmute/toggle with storage
  mute() {
    this.isMuted = true;
    this.saveToStorage("notificationMuted", "true");
    // console.log("🔇 Notifications muted");
  }

  unmute() {
    this.isMuted = false;
    this.saveToStorage("notificationMuted", "false");
    // console.log("🔊 Notifications unmuted");
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.saveToStorage("notificationMuted", this.isMuted ? "true" : "false");
    // console.log(
    //   "🔄 Notifications toggled:",
    //   this.isMuted ? "muted" : "unmuted"
    // );
    return this.isMuted;
  }

  // Cross-browser storage
  saveToStorage(key, value) {
    try {
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          localStorage.setItem(key, value);
        } else if (window.sessionStorage) {
          sessionStorage.setItem(key, value);
        } else {
          document.cookie = `${key}=${value}; path=/; max-age=31536000`;
        }
      }
    } catch (error) {
      console.warn("Storage save failed:", error);
    }
  }

  // Cross-browser storage retrieval
  getFromStorage(key) {
    try {
      if (typeof window !== "undefined") {
        if (window.localStorage) {
          return localStorage.getItem(key);
        } else if (window.sessionStorage) {
          return sessionStorage.getItem(key);
        } else {
          const cookies = document.cookie.split(";");
          for (let cookie of cookies) {
            const [name, value] = cookie.trim().split("=");
            if (name === key) return value;
          }
        }
      }
    } catch (error) {
      console.warn("Storage retrieval failed:", error);
    }
    return null;
  }

  // Get mute status with storage fallback
  getMuteStatus() {
    const stored = this.getFromStorage("notificationMuted");
    if (stored !== null) {
      this.isMuted = stored === "true";
    }
    return this.isMuted;
  }

  // Enhanced audio playback with multiple fallbacks
  async playSound() {
    if (typeof window === "undefined" || this.isMuted) {
      // console.log(
      //   "🔇 Sound playback skipped:",
      //   this.isMuted ? "muted" : "no window"
      // );
      return;
    }

    if (!this.isInitialized) {
      // console.log("🔊 Initializing audio before playback");
      await this.initializeAudio();
    }

    try {
      // Method 1: Standard HTML5 Audio
      if (this.audio && typeof this.audio.play === "function") {
        try {
          // Reset to start for quick consecutive plays
          this.audio.currentTime = 0;
        } catch {}
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          // console.log("🔊 Sound played successfully");
        }
        return;
      }

      // Method 2: Web Audio API
      if (this.audioContext && this.audioBuffer) {
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();

        source.buffer = this.audioBuffer;
        gainNode.gain.value = this.defaultVolume;

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        source.start(0);
        // console.log("🔊 Web Audio API sound played");
        return;
      }

      // Method 3: Create new audio element
      await this.playFallbackAudio();
    } catch (error) {
      console.warn("Could not play notification sound:", error);
      // Try one more fallback
      this.playSystemSound();
    }
  }

  // Fallback audio playback
  async playFallbackAudio() {
    const format = this.getBestAudioFormat();
    const fallbackAudio = new Audio(`/sounds/notification.${format}`);
    fallbackAudio.volume = this.defaultVolume;

    try {
      await fallbackAudio.play();
      // console.log("🔊 Fallback audio played");
    } catch (error) {
      console.warn(
        "Fallback audio failed, waiting for user interaction:",
        error
      );
      // Try with user interaction
      document.addEventListener(
        "click",
        async () => {
          try {
            await fallbackAudio.play();
            // console.log("🔊 Audio played after user interaction");
          } catch (e) {
            console.warn("Fallback audio failed:", e);
          }
        },
        { once: true }
      );
    }
  }

  // System sound fallback (vibration on mobile)
  playSystemSound() {
    try {
      // Vibration API for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
        // console.log("📳 Vibration triggered");
      }

      // Visual feedback as last resort
      this.showVisualFeedback();
    } catch (error) {
      console.warn("System sound fallback failed:", error);
    }
  }

  // Visual feedback when audio fails
  showVisualFeedback() {
    if (typeof window === "undefined") return;

    const flash = document.createElement("div");
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(59, 130, 246, 0.1);
      z-index: 9999;
      pointer-events: none;
      animation: notificationFlash 0.3s ease-out;
    `;

    // Add CSS animation
    if (!document.getElementById("notification-flash-style")) {
      const style = document.createElement("style");
      style.id = "notification-flash-style";
      style.textContent = `
        @keyframes notificationFlash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
    // console.log("✨ Visual feedback shown");
  }

  // Enhanced notification with multiple fallbacks
  async showNotification(title, options = {}) {
    if (typeof window === "undefined") return;

    // console.log("🔔 Showing notification:", title, options);

    try {
      const permission = await this.requestPermission();

      // Modern Notification API
      if (permission === "granted" && this.notificationSupport.native) {
        const notification = new Notification(title, {
          body: options.body || "",
          icon: options.icon || "/favicon.ico",
          tag: options.tag || "default",
          badge: options.badge || "/favicon.ico",
          image: options.image,
          silent: this.isMuted,
          requireInteraction: options.requireInteraction || false,
          ...options,
        });

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000);

        // Handle click events
        notification.onclick =
          options.onClick ||
          (() => {
            window.focus?.();
            notification.close();
          });

        // console.log("✅ Native notification shown");
      }

      // Webkit notifications fallback (older Safari)
      else if (
        this.notificationSupport.webkitNotifications &&
        window.webkitNotifications.checkPermission() === 0
      ) {
        const notification = window.webkitNotifications.createNotification(
          options.icon || "/favicon.ico",
          title,
          options.body || ""
        );
        notification.show();
        setTimeout(() => notification.cancel(), 5000);
        // console.log("✅ Webkit notification shown");
      }

      // Service Worker notifications fallback
      else if (
        this.notificationSupport.serviceWorker &&
        "serviceWorker" in navigator &&
        navigator.serviceWorker.ready
      ) {
        const registration = await navigator.serviceWorker.ready;
        if (registration.showNotification) {
          await registration.showNotification(title, {
            body: options.body || "",
            icon: options.icon || "/favicon.ico",
            badge: options.badge || "/favicon.ico",
            tag: options.tag || "default",
            silent: this.isMuted,
          });
          // console.log("✅ Service Worker notification shown");
        }
      } else {
        // Fallback UI if nothing else worked
        this.showFallbackNotification(title, options);
      }

      // Always try to play sound (unless muted)
      await this.playSound();
    } catch (error) {
      console.warn("Could not show notification:", error);
      // Show fallback notification
      this.showFallbackNotification(title, options);
    }
  }

  // Fallback notification for unsupported browsers
  showFallbackNotification(title, options = {}) {
    // console.log("📱 Showing fallback notification");

    // Create custom notification element
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 300px;
      font-family: system-ui, -apple-system, sans-serif;
      animation: slideIn 0.3s ease-out;
    `;

    notification.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">${title}</div>
      ${
        options.body
          ? `<div style="color: #666; font-size: 14px;">${options.body}</div>`
          : ""
      }
      <button onclick="this.parentElement.remove()" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
      ">×</button>
    `;

    // Add slide-in animation
    if (!document.getElementById("notification-slide-style")) {
      const style = document.createElement("style");
      style.id = "notification-slide-style";
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);

    // Play sound
    this.playSound();
  }

  // Get browser compatibility info
  getCompatibilityInfo() {
    return {
      notifications: this.notificationSupport,
      audio: this.audioSupport,
      storage: {
        localStorage: typeof Storage !== "undefined" && !!window.localStorage,
        sessionStorage:
          typeof Storage !== "undefined" && !!window.sessionStorage,
        cookies: navigator.cookieEnabled,
      },
      vibration: "vibrate" in navigator,
      serviceWorker: "serviceWorker" in navigator,
    };
  }
}

// Create singleton instance
const notificationAlert = new NotificationAlert();
export default notificationAlert;
