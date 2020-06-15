<template>
    <div class="flexc-xyc h100">
        <img src="@/assets/error/page404.svg" />
        <p class="text-weak mt20">Sorry, the page you visited does not exist.</p>
        <el-button class="mt20" @click="$router.push('/overview/index')">
            Back to Home
        </el-button>
    </div>
</template>

<script>
export default {
    name: "Page404",
};
</script>
