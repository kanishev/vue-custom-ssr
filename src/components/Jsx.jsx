import { defineComponent } from 'vue'

export const JSX = defineComponent({
  name: 'jsx-test',
  setup() {
    return () => <div class="jsx">from JSX</div>
  },
})
