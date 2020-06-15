<template>
    <div id="app">
        <router-view :key="$router.fullPath" />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>
