# Immich Frame

A standalone digital photo frame that displays your [Immich](https://immich.app/) photo library on a 10" touchscreen — no Home Assistant or other hub required.

<p align="center">
  <img src="docs/public/immich-frame.png" alt="Immich Frame displaying photos on a Guition ESP32-P4 10-inch screen" width="700" />
</p>

Built with [ESPHome](https://esphome.io/) on the ESP32-P4, the frame connects directly to your Immich server over HTTP and streams photos with smooth transitions, smart portrait pairing, and touch gesture navigation.

## Features

- **Fully standalone** — runs on bare hardware, no hub or cloud service needed
- **Smart portrait pairing** — detects portrait photos and pairs them side-by-side from the same day
- **Prefetched transitions** — next image loads in the background for instant slide changes
- **Touch gestures** — swipe left/right to navigate, long press to advance
- **Accent colour fill** — letterboxed areas are tinted with a colour sampled from the photo
- **Runtime configuration** — change Immich URL, API key, slideshow interval, and more via the built-in web UI

## Hardware

The frame runs on the **Guition ESP32-P4 10" display** (JC8012P4A1) — a 1280×800 MIPI DSI touchscreen with an ESP32-P4 and ESP32-C6 coprocessor for WiFi/Bluetooth.

| Item | Link |
|------|------|
| Panel | [AliExpress](https://s.click.aliexpress.com/e/_c4LLo3rH) |
| Printable stand | [MakerWorld](https://makerworld.com/en/models/2490049-guition-p4-10inch-screen-stand#profileId-2736046) |

## Install

The easiest way to get started is with the **web installer** — flash the firmware directly from your browser with no toolchain or build step.

**[Open the Web Installer →](https://jtenniswood.github.io/espframe/install)**

You'll need a USB-C data cable and Chrome or Edge on desktop.

## Documentation

Full docs — including getting started, configuration, and troubleshooting — are available at:

**[jtenniswood.github.io/espframe](https://jtenniswood.github.io/espframe/)**