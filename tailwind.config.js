
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/routes/**/*.{svelte,js,ts}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                cuchos: {
                    "primary": "#F5793B", //Same as figma (orange)
                    'primary-content': '#FFFFFF',
                    "secondary": "#eaa1df",
                    "secondary-content": "#131515",
                    "accent": "#3B60E4",
                    "neutral": "#131515", //Same as figma (black)
                    "base-100": "#FDFFFC",
                    "info": "#3E92CC",
                    "info-content": "#3E92CC",
                    "success": "#60D394", //Same as figma (green)
                    "success-content": "#FDFFFC",
                    "warning": "#F9DC5C", //Same as figma (yellow)
                    "warning-content": "#FDFFFC",
                    "error": "#F03A47", //Same as figma (red)
                    "error-content": "#FDFFFC",

                    "bg-primary": "#FDFFFC",
                    "bg-color": "#FDFFFC",
                    "border-grey": "#E4E4E4",
                    "border-orange": "#FFD0B9",
                    "border-orange-focus": "#F5793B",
                },
            },
        ],
    },
}