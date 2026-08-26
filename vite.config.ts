import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function buildSha() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    // Tarball / file deploys have no .git. Prefer the stamped origin sha.
  }
  try {
    const stamp = JSON.parse(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public/build.json'), 'utf8'),
    ) as { short?: string }
    if (stamp.short) return stamp.short
  } catch {
    // ignore
  }
  const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA
  return vercelSha ? vercelSha.slice(0, 7) : 'dev'
}

export default defineConfig({
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha()),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 43173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 43173,
    strictPort: true,
  },
})
