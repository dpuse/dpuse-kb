<script setup lang="ts">
// ── Options, Properties, Slots & Emits ───────────────────────────────────────────────────────────────────────────────

import { useData } from 'vitepress';

const { title, category } = defineProps<{ title: string; category: string }>();

defineSlots<{ icon?(): unknown; iconDark?(): unknown }>();

// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const { isDark } = useData();
</script>

<template>
    <div class="overline">{{ category }} Connector</div>

    <div class="header">
        <div v-if="$slots.icon" class="logo">
            <ClientOnly>
                <slot v-if="isDark && $slots.iconDark" name="iconDark" />
                <slot v-else name="icon" />
            </ClientOnly>
        </div>
        <div class="title-wrapper">
            <h1 class="title">{{ title }}</h1>
        </div>
    </div>
</template>

<style scoped>
.overline {
    color: var(--vp-c-text-2);
    font-size: 0.875rem;
}

.header {
    align-items: center;
    column-gap: 0.5rem;
    display: flex;
    margin-bottom: 1rem;
    > .logo {
        height: 2.25rem;
        width: 2.25rem;

        :deep(svg) {
            height: 2.25rem;
            width: 2.25rem;
        }
    }

    > .title-wrapper {
        min-width: 0;
        > .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
