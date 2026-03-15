import type { ConfigOverride } from './types'

export const noop: (base: ConfigOverride) => ConfigOverride = base => base
