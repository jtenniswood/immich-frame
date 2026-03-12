# Configuration

All settings can be changed at any time through the device's built-in web UI — no recompilation needed.

## Web UI Settings

Open `http://<device-ip>/` in your browser to access the settings page. Changes are saved to flash and persist across reboots.

### Immich Connection

| Setting | Description |
|---|---|
| **Immich URL** | Your Immich server address (e.g. `http://192.168.1.30:2283`) |
| **Immich API Key** | Your Immich API key (masked in the UI for security) |

See [Creating an API Key](/api-key) for how to generate a key and which permissions to select.

### Slideshow

| Setting | Default | Description |
|---|---|---|
| **Slideshow Interval** | 15s | Time between photos (5–300 seconds) |

### Clock

| Setting | Default | Description |
|---|---|---|
| **Show Clock** | On | Toggle the clock overlay on the slideshow screen |
| **Clock Format** | 24 Hour | `24 Hour` or `12 Hour` |
| **Timezone** | Europe/London | Select from a list of common timezones |