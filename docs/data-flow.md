# Data Flow

## Forward Advance

Triggered by the timer, a swipe left, or a long press:

1. Save current metadata (including zoom) to `immich_prev_*` globals.
2. Reset portrait pair state (`portrait_left_ready`, `portrait_right_ready`, `portrait_companion_found`, `immich_is_portrait_pair`, `portrait_using_preload`).
3. Advance `active_slot` to `(active + 1) % 3`.
4. If next slot is already prefetched (`slotN_ready`), display instantly and kick off prefetch chain.
5. Otherwise, set `target_slot` and run `immich_fetch_into_slot`.

## Fetch Into Slot

1. `POST {immich_url}/api/search/random` with `{"size":1,"type":"IMAGE","withExif":true,"withPeople":true}`. The URL and API key are read at runtime from the `immich_url` and `immich_api_key_text` text components.
2. Parse response for asset `id`, `localDateTime`, `exifInfo` (city, country, dateTimeOriginal, exifImageWidth, exifImageHeight, orientation), and `people` (first person name).
3. Determine portrait status from EXIF dimensions (accounting for orientation tags 5–8 which swap axes). Calculate zoom for mildly panoramic landscapes.
4. Build image URL: `{immich_url}/api/assets/{id}/thumbnail?size=preview`.
5. Store parsed metadata (including `is_portrait`, `datetime`, `companion_url`, `zoom`) into the target slot's globals.
6. Trigger `online_image.set_url` on the corresponding image component.

## Image Download Callback

1. `on_download_finished` marks slot as ready, resets error retries.
2. If this slot is the active slot, copy its metadata to the current display globals and run `immich_display_current`.
3. If this slot is **not** the active slot and is portrait, trigger `immich_fetch_portrait_companion` to search for a companion portrait and begin preloading the pair.
4. Otherwise, trigger `immich_prefetch_chain` to fill the next empty slot(s).

## Display Current

The `immich_display_current` script:

1. Show the standard `slideshow_img` and hide the `portrait_pair_container`.
2. Update `slideshow_img` source to the active slot's image and apply the slot's zoom level.
3. Run accent color extraction.
4. **Portrait preload check:** If the active slot is portrait and portrait preload data is ready for this slot, instantly switch to portrait pair display using the preloaded images.
5. **Portrait companion check:** If the active slot is portrait but no preloaded pair is available, start downloading the left (primary) portrait and either use the already-known companion URL or trigger `immich_fetch_portrait_companion` to find one.

## Companion Portrait Search

The `immich_fetch_portrait_companion` script:

1. Extract the calendar date (first 10 characters) from the portrait's `localDateTime`.
2. `POST {immich_url}/api/search/random` with `{"size":10,"type":"IMAGE","withExif":true,"takenAfter":"YYYY-MM-DDT00:00:00.000Z","takenBefore":"YYYY-MM-DDT23:59:59.999Z"}`.
3. Iterate results, skip the primary asset, and check EXIF dimensions for portrait orientation.
4. If a companion is found:
   - If the target slot is the **active** slot, start downloading into `immich_portrait_right` immediately.
   - If the target slot is a **prefetch** slot, start preloading both halves into `immich_portrait_preload_left` and `immich_portrait_preload_right`.
5. Store the companion URL in the slot's `companion_url` global so it's available for instant use when that slot becomes active.
6. Continue the prefetch chain regardless of companion search outcome.

## Display Portrait Pair

The `immich_display_portrait_pair` script:

1. Called when both `portrait_left_ready` and `portrait_right_ready` are true.
2. Hide `slideshow_img`, show `portrait_pair_container`.
3. Update `portrait_left_img` and `portrait_right_img` sources.
4. Run accent color extraction.
5. Continue the prefetch chain.

## Prefetch Chain

Checks the two slots ahead of `active_slot`. Fetches into the first one that isn't ready. Runs recursively via the download callback until all slots are filled.
