import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'server/main.ts',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
