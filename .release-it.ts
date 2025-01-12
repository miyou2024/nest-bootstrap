import type { Config } from 'release-it';

export default {
  git: {
    commitMessage: "chore: release v${version}",
    commit: true,
    tag: true,
    push: true
  },
  github: {
    release: true
  },
  npm: {
    timeout: 100000,
    publish: true
  },
  plugins: {
    "@release-it/conventional-changelog": {
      "preset": {
        "name": "angular"
      },
      "infile": "CHANGELOG.md"
    }
  }
} satisfies Config;