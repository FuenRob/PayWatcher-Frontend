import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonComponent from '../ButtonComponent.vue'

describe('ButtonComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(ButtonComponent, { props: { label: 'Login', type: 'submit' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
