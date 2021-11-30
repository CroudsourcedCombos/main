const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase) => {
  return {
    reactStrictMode: true,
    env: {
      gqlServerUrl: phase === PHASE_DEVELOPMENT_SERVER ? "http://localhost:4000/" : "https://ccgql.cobular.com"
    }
  }
}
