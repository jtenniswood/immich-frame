---
layout: home

hero:
  name: Immich Frame
  text: Standalone Digital Photo Frame
  tagline: Display your Immich photo library on a Guition ESP32-P4 — no Home Assistant required.
  image:
    src: /immich-frame.png
    alt: Immich Frame displaying photos on a Guition ESP32-P4 10-inch screen
  actions:
    - theme: brand
      text: Get Started
      link: /install
    - theme: alt
      text: Install
      link: /install
    - theme: alt
      text: View on GitHub
      link: https://github.com/jtenniswood/espframe

features:
  - title: Fully Standalone
    details: Runs directly on the ESP32-P4 with ESPHome. Connects to your Immich server over HTTP — no Home Assistant or other hub needed.
  - title: Smart Portrait Pairing
    details: Automatically detects portrait photos and finds a companion portrait from the same day, displaying them side-by-side to fill the screen.
  - title: Smooth Transitions
    details: Upcoming images are prefetched in the background so transitions between photos are instant.
  - title: Touch Gestures
    details: Swipe left/right to navigate and long press to advance. Works on both single images and portrait pairs.
  - title: Accent Color Fill
    details: Samples the displayed photo to extract a dominant colour, filling letterboxed areas with a complementary tint instead of plain black.
  - title: Runtime Configuration
    details: Change the Immich URL and API key at any time via the built-in web UI — no recompilation needed.
---
