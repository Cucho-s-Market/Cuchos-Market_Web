
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{svelte,js,ts}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                cuchos: {
                    "primary": "#F5793B",
                    'primary-content': '#FDFFFC',
                    "secondary": "#eaa1df",
                    "secondary-content": "#131515",
                    "accent": "#3B60E4",
                    "accent-content": "#FDFFFC",
                    "neutral": "#131515",
                    "base-100": "#FDFFFC",
                    "info": "#3E92CC",
                    "info-content": "#3E92CC",
                    "success": "#60D394",
                    "success-content": "#FDFFFC",
                    "warning": "#F9DC5C",
                    "warning-content": "#FDFFFC",
                    "error": "#F03A47",
                    "error-content": "#FDFFFC",

                    "bg-color": "#FDFFFC",
                    "border-grey": "#E4E4E4",
                    "border-orange": "#FFD0B9",
                    "border-orange-focus": "#F5793B",
                },
            },
        ],
    },
}