/**
 * @vitest-environment happy-dom
 */

import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FormWithExpose from '../src/Vue/FormWithExpose.vue'

test('vue cache conditional branches should not appear in v8 coverage', async () => {
  const wrapper = mount(FormWithExpose)
  expect(wrapper.find('form').exists()).toBe(true)

  // Type into the input
  await wrapper.find('input').setValue('test-value')
  expect(wrapper.find('input').element.value).toBe('test-value')

  // Trigger form submit via exposed method
  vi.spyOn(wrapper.vm.$refs.form as HTMLFormElement, 'requestSubmit').mockImplementation(() => {})
  await wrapper.vm.triggerFormSubmit()
})
