<template>
    <div class="flexc-xyc h100">
        <img src="@/assets/error/page403.svg" />
        <p class="text-weak mt20">Sorry, you don't have access to this page.</p>
        <el-button class="mt20" @click="$router.push('/overview/index')">
            Back to Home
        </el-button>
    </div>
</template>

<script>
export default {
    name: "Page401",
};
</script>
