const { join } = require("path")

/**
 * Puppeteer configuration.
 *
 * Store the downloaded Chromium inside the project folder (Backend/.cache/
 * puppeteer) instead of the user's home directory. Hosts like Render don't
 * carry $HOME/.cache from build into runtime, so keeping the browser in the
 * project directory guarantees it's found both when `npx puppeteer browsers
 * install chrome` runs at build time and when the server launches it later.
 */
module.exports = {
    cacheDirectory: join(__dirname, ".cache", "puppeteer"),
}
