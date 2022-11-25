<template>
  <div class="example">
    <p>
      Example without `v-model` where we just listen to a change event
      <BaseSelect :options="options" @change="navigate">
        <!-- Here the button can be customised -->
        <!-- By default it displays the active option -->
        <template #button>Select an option</template>
      </BaseSelect>
    </p>

    <p>
      Example with `v-model` where we update a ref within the component (e.g. a form)
      <BaseSelect :options="variants" v-model="selectedVariant" @change="onChange">
        <!-- Here the button appearance can be customised with the content of the selected option -->
        <template #button="{ option }">Percentage: {{ option.title }}</template>
        <!-- Customise the `title` part of the option -->
        <!-- We can also add a `description` slot to customise that -->
        <!-- The current option is received as a slot prop -->
        <template #title="{ option }">
          <span style="color: red">{{ option.title }}</span>
        </template>
      </BaseSelect>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseSelect from './Select/BaseSelect.vue'

type NavigationOption = IOption<{ url: string }>

function navigate(option: NavigationOption) {
  alert(`Navigate to ${option.metadata.url}`)
}

const options: NavigationOption[] = [
  {
    title: 'New A/B Test',
    desc: 'A/B Test is used to determine if the test leads to statistically significant metrics change than the control.',
    metadata: { url: '/experiments/new?type=ab-test' },
  },
  {
    title: 'Gradual Rollout',
    desc: 'Gradual Rollout is to determine that the rollout group is not inferior to the non rollout group',
    metadata: { url: '/experiments/new?type=rollout' },
  },
]

// sorry this makes no sense
const variants: IOption[] = [{ title: '25%' }, { title: '50%' }, { title: '75%' }, { title: '100%' }]
const selectedVariant = ref(variants[1])
</script>

<style scoped>
.example {
  font-family: apple-system, system-ui, BlinkMacSystemFont;
}
</style>
