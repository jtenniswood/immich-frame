# Architecture

## Project Structure

```
guition-esp32-p4-jc8012p4a1/
├── esphome.yaml                # User entry point (substitutions, wifi, remote package ref)
├── packages.yaml               # Aggregates all local packages
├── device/
│   └── device.yaml             # Hardware config (display, touch, SoC, external components)
├── addon/
│   ├── lvgl_base.yaml          # Shared LVGL config (buffer, displays)
│   ├── connectivity.yaml       # WiFi, captive portal, HTTP client
│   ├── immich_config.yaml      # Runtime-configurable Immich URL and API key
│   ├── backlight.yaml          # Display backlight light component
│   ├── screen_loading.yaml     # Loading screen (LVGL page + boot sequence)
│   ├── screen_wifi_setup.yaml  # WiFi setup screen (LVGL page)
│   ├── screen_immich_setup.yaml # Immich setup screen (LVGL page)
│   ├── screen_slideshow.yaml   # Slideshow screen (LVGL page, touch gestures, timer)
│   ├── accent_color.yaml       # Extract accent color from photo for letterbox fill
│   └── time.yaml               # SNTP clock and time label updates
├── assets/
│   ├── fonts.yaml              # Roboto font definitions
│   └── icons.yaml              # MDI icons for setup screens
└── components/
    └── gsl3680/                # Custom touchscreen driver
components/
└── online_image/               # Patched online_image with header-based auth
```

Each screen is a self-contained YAML file that contributes an LVGL page, along with any screen-specific globals and scripts, to the merged config. ESPHome's `packages:` system deep-merges dictionaries and appends lists, so each file can independently define `lvgl: pages:`, `globals:`, `script:`, etc.

## 3-Slot Image Ring Buffer

Three `online_image` components (`immich_img_0`, `immich_img_1`, `immich_img_2`) form a circular buffer. At any time one slot is **active** (displayed), and the system prefetches into the next two slots. Each slot stores its own metadata (asset ID, image URL, date, location, year, month, person, is_portrait, datetime, companion_url, zoom).

When advancing forward, the active slot index moves `(active + 1) % 3`. If that slot is already prefetched, display is instant. Otherwise, a fresh API call fetches into it.

## Portrait Detection and Dual Display

When fetching an image, EXIF dimensions (`exifImageWidth`, `exifImageHeight`) and `orientation` are parsed to determine whether the photo is portrait. EXIF orientations 5–8 swap width and height before comparison. If `height > width`, the image is flagged as portrait.

When a portrait is displayed, the system searches Immich for a **companion portrait** taken on the same calendar day. If one is found, both portraits are downloaded at half-width (640×1200) and displayed **side-by-side** in a `portrait_pair_container`, filling the 1280×800 screen more effectively than a single letterboxed portrait.

The system uses four dedicated `online_image` components for portrait pairs:

- **`immich_portrait_left`** and **`immich_portrait_right`** — for the currently displayed pair.
- **`immich_portrait_preload_left`** and **`immich_portrait_preload_right`** — for prefetching the next portrait pair during the prefetch chain, enabling instant transitions.

If no companion is found or the companion download fails, the portrait falls back to single-image display in the standard slot.

## Landscape Zoom

For landscape images with aspect ratios between 1.6:1 and 2.0:1 (mildly panoramic), a zoom level is calculated to fill the 800px display height, slightly cropping the sides. The zoom value is stored per-slot as a `uint16_t` (256 = no zoom, higher = more zoom). LVGL's `lv_img_set_zoom` applies it at display time. Images wider than 2.0:1 are not zoomed (too panoramic to crop usefully).

## Previous Image Navigation

One previous image is stored separately (`immich_prev_*` globals, including zoom level). Swiping right swaps current and previous metadata, re-downloads the previous image URL into the newly active slot.

## Boot Sequence

1. **Priority -200:** Turn on backlight at 100%, set progress bar to 25%.
2. **Priority -100:** Set progress bar to 50%. Populate WiFi setup instructions with device name.
3. **WiFi connect:** Set progress bar to 100%, navigate to `slideshow_page` (or `immich_setup_page` if Immich is not configured), start first image fetch.
4. **10s timeout:** End boot grace period. If still no WiFi, navigate to `wifi_setup_page`.

## Runtime Guardrails

- **Advance debounce:** Timer skips if last advance was less than 10s ago.
- **In-flight guard:** All scripts use `mode: single` to prevent overlapping API calls.
- **Error retry:** Up to 3 retries with 2s delay on image decode failure, then gives up and resets counter.
- **WiFi disconnect:** Shows captive portal setup prompt (after boot grace period).
- **Slot readiness:** Forward advance blocks display until the slot's image has fully downloaded; current image remains on screen until then.
- **Portrait fallback:** If portrait companion search fails or either portrait image fails to decode, the system falls back to single-image display.
- **Portrait state reset:** On every advance (forward or backward), all portrait pair state is reset to prevent stale data.
