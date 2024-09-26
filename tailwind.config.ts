import { merge } from 'lodash'
import type { Config } from 'tailwindcss'
import {
  ColorGroundConfig,
  tailwindColorConfig,
  tailwindElevationConfig,
  tailwindSpacingConfig,
  tailwindRadiusConfig,
  tailwindMotionsConfig,
  tailwindTypographyConfig,
} from '@eolluga/eolluga-ui'

const baseConfig: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}

const config: Config = merge(
  baseConfig,
  ColorGroundConfig,
  tailwindElevationConfig,
  tailwindSpacingConfig,
  tailwindRadiusConfig,
  tailwindMotionsConfig,
  tailwindTypographyConfig,
)

export default config
