<template>
  <div class="baseSelect" :class="{ '-open': isOpen }">
    <button class="baseSelect__button" @click="isOpen = !isOpen">
      <slot name="button" :option="modelValue">
        <div class="baseSelect__title">{{ modelValue?.title }}</div>
      </slot>
    </button>

    <ul class="baseSelect__options">
      <li v-for="option in options" class="baseSelect__option" @click="select(option)" :key="option.title">
        <div class="baseSelect__title">
          <slot name="title" :option="option">
            {{ option.title }}
          </slot>
          <p v-if="option.desc">
            <slot name="desc" :option="option">
              <span class="baseSelect__desc">{{ option.desc }}</span>
            </slot>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'

defineProps<{ modelValue: IOption; options: IOption[] }>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

function select(option: IOption) {
  emit('change', option)
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.baseSelect {
  display: flex;
  position: relative;
  max-width: 15rem;
  background: #eee;
  margin: 1rem 0;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #555555 transparent transparent transparent;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }

  &__button {
    all: unset;
    cursor: pointer;
    width: 100%;
    padding: 0.75rem 2rem 0.75rem 1rem;
  }

  &__options {
    display: none;
    position: absolute;
    z-index: 2;
    list-style: none;
    padding: 0;
    background: #e0e0e0;
    width: 100%;
    top: 100%;
    margin: 0;

    .-open & {
      display: block;
    }
  }
  &__option {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  &__desc {
    color: #888;
    font-size: smaller;
  }
}
</style>
