import { merge } from 'lodash'
import type { Config } from 'tailwindcss'
import {
  ColorGroundConfig,
  tailwindElevationConfig,
  tailwindSpacingConfig,
  tailwindRadiusConfig,
  tailwindMotionsConfig,
  tailwindTypographyConfig,
} from '@eolluga/eolluga-ui'

const baseConfig: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {},
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
