import { unlink } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import packageJson from '../package.json' with { type: 'json' }

const execFileAsync = promisify(execFile)

const { stdout } = await execFileAsync('npm', ['pack', '--json'], {
  cwd: process.cwd(),
})

const [packResult] = JSON.parse(stdout)

if (!packResult) {
  throw new Error('npm pack did not return package metadata')
}

const packedFiles = new Set(packResult.files.map(({ path }) => path))

try {
  if (packageJson.types && !packedFiles.has(packageJson.types)) {
    throw new Error(
      `Package types entry "${packageJson.types}" is missing from the packed artifact. Packed files: ${[...packedFiles].join(', ')}`,
    )
  }

  if (packageJson.main && !packedFiles.has(packageJson.main)) {
    throw new Error(
      `Package main entry "${packageJson.main}" is missing from the packed artifact.`,
    )
  }

  if (packageJson.module && !packedFiles.has(packageJson.module)) {
    throw new Error(
      `Package module entry "${packageJson.module}" is missing from the packed artifact.`,
    )
  }

  console.log('Packed artifact contains all declared package entrypoints.')
} finally {
  if (packResult.filename) {
    await unlink(packResult.filename).catch(() => { })
  }
}
