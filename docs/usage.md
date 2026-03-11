# Usage

## Touch Gestures

| Gesture | What it does |
|---|---|
| **Swipe left** | Next photo |
| **Swipe right** | Previous photo |
| **Tap** | Show or hide the info overlay |
| **Long press** | Next photo |

These gestures work the same whether a single photo or a portrait pair is on screen.

## Info Overlay

Tap the screen to show the info overlay in the bottom-left corner. It displays:

- **Clock** — current time (if enabled in [settings](./configuration#clock))
- **Time ago** — how long ago the photo was taken (e.g. "3 years ago")
- **Location** — where the photo was taken (city and country from EXIF data)

Tap again to hide it. If you've set an **Info Overlay Timeout** in the [settings](./configuration#slideshow), it hides automatically after that many seconds.

## Portrait Pairing

When a portrait (vertical) photo comes up, the frame automatically searches your Immich library for another portrait taken on the same day. If one is found, both portraits are displayed **side by side**, filling the widescreen display much better than a single letterboxed portrait.

If no companion portrait is found for that day, the photo is shown on its own.

## Accent Color Fill

When a photo doesn't fill the entire screen (letterboxing), the black bars are replaced with a muted colour sampled from the photo itself. This makes transitions feel smoother and the display more cohesive.

## Slideshow

Photos are fetched randomly from your Immich library and advance automatically based on the **Slideshow Interval** set in [configuration](./configuration#slideshow). The frame prefetches upcoming images in the background so transitions are instant.

You can manually navigate at any time with swipe gestures — the auto-advance timer resets when you do.
