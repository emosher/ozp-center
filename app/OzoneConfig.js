// @exclude
//
// This file is preprocessed by gulp to create the config file
// based on environment variables and/or defaults.
//
// Only modify this file to change the defaults.  In order to set actual configuration values
// for production, modify the file that gets built from this. To temporarily set configurations
// during dev (or at build time), use enviroment variables
//
// @endexclude
window.OzoneConfig = {
    // @ifdef API_URL
    "API_URL": '/* @echo API_URL */',
    // @endif
    // @ifndef API_URL
    "API_URL": 'https://localhost:8443/marketplace',
    // @endif
    // @ifdef HELP_URL
    "HELP_URL": '/* @echo HELP_URL */',
    // @endif
    // @ifndef HELP_URL
    "HELP_URL": "../hud-ui/assets/PlaceholderUserGuide.pdf",
    // @endif
    // @ifdef METRICS_URL
    "METRICS_URL": '/* @echo METRICS_URL */',
    // @endif
    // @ifndef METRICS_URL
    "METRICS_URL": "https://www.owfgoss.org:10443/dev/metrics/",
    // @endif
    // @ifdef HUD_URL
    "HUD_URL": '/* @echo HUD_URL */',
    // @endif
    // @ifndef HUD_URL
    "HUD_URL": "http://localhost:8088/dist"
    // @endif
};
