# Install

Flash Immich Frame directly from your browser — no toolchain needed.

## Web Installer

Connect your Guition ESP32-P4 (JC8012P4A1) via USB-C and click the button below.

<EspInstallButton />

::: info Browser Support
The web installer requires **Chrome** or **Edge** on desktop with [WebSerial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) support. Safari and Firefox are not supported.
:::

## What You'll Need

- **Guition ESP32-P4 10" display** (JC8012P4A1)
- **USB-C cable** (data-capable, not charge-only)
- **Immich server** running on your network — [immich.app](https://immich.app/)
- An **Immich API key** ([how to create one](https://immich.app/docs/features/command-line-interface#obtain-the-api-key))

## Step-by-Step

### 1. Connect the device

Plug the Guition display into your computer with a USB-C cable. If your OS asks to install drivers, allow it.

### 2. Flash the firmware

Click **Install Immich Frame** above. Select the serial port for your device in the browser dialog, then confirm the installation. Flashing takes a few minutes.

### 3. Configure WiFi

After flashing, the installer will prompt you to enter your WiFi credentials. Enter your network name and password to connect the device.

If the serial prompt doesn't appear, the device will create a WiFi hotspot named **immich-frame-10inch**. Connect to it from your phone or laptop and a captive portal will guide you through WiFi setup.

### 4. Configure Immich

Once connected to your network, open the device's IP address in a browser (shown on the device screen). Enter your **Immich server URL** and **API key** in the web interface.

The frame will start displaying photos from your Immich library.

## Next Steps

- [Configuration](/configuration) — slideshow interval, clock, timezone, and more
- [Troubleshooting](/troubleshooting) — common issues and fixes

## Manual Install

If you prefer to compile from source using ESPHome, see the [Getting Started](/getting-started) guide.
