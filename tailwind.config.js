/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{svelte,js,ts}'],
    theme: {
        colors: {
            "bg-color": "#FDFFFC",
            "br-grey": "#E4E4E4",
            "br-orange": "#FFD0B9",
            "br-orange-focus": "#F5793B",
            "bg-product-list": "#FCFCFC",
            "normal-grey": "#8E8E8E",
            "light-grey": "#F8F8F8",
            "neutral-grey": "#746F72",
            "dark-green": "#388E3C",
            "white": "#ffffff"
        },
        extend: {
            fontFamily: {
                'poppins': ['Poppins'],
            }
        },
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
                    "base-200": "#FCFCFC",
                    "base-300": "#F4F4F4",
                    "info": "#3E92CC",
                    "success": "#60D394",
                    "warning": "#F9DC5C",
                    "error": "#F03A47",
                    "error-content": "#FDFFFC",
                    "neutral-category": "#746F72",
                    "grey": "#D9D9D9",
                },
            },
        ],
    },
 }
 