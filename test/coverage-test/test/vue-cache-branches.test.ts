import { expect } from 'vitest'
import { isV8Provider, readCoverageJson, runVitest, test } from '../utils'

test('vue template cache branches (_cache[N] || ...) should be excluded from v8 coverage', async () => {
  await runVitest({
    include: ['fixtures/test/vue-cache-branches.test.ts'],
    coverage: { reporter: 'json' },
  })

  const coverageJson = await readCoverageJson()

  // Find the FormWithExpose.vue coverage
  const formCoverage = Object.entries(coverageJson).find(([key]) =>
    key.includes('FormWithExpose.vue'),
  )

  expect(formCoverage).toBeDefined()
  const [, coverage] = formCoverage!

  if (isV8Provider()) {
    // V8 provider should not include _cache[N] || (...) branches
    // from the compiled template's event handler caching
    const branchTypes = Object.values(coverage.branchMap).map((b: any) => b.type)

    // The only expected branch is the "if (!form.value)" guard in the script
    expect(branchTypes).toMatchInlineSnapshot(`
      [
        "if",
      ]
    `)
  }
  else {
    // Istanbul instruments differently and may include different branch types
    const branchCount = Object.keys(coverage.branchMap).length
    expect(branchCount).toBeGreaterThanOrEqual(1)
  }
})
