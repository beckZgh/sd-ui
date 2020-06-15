<template>
    <el-input
        v-model.number="interanlVal"
    />
</template>

<script>
export default {
    name: 'El2Number',
    props: {
        value: [Number],
    },
    data() {
        return {
            interanlVal: this.value,
        }
    },
    watch: {
        interanlVal(val) {
            const interanlVal = Number(String(val).replace(/[^\w]/g, ''));
            this.interanlVal  = isNaN(interanlVal) ? 0 : interanlVal;
            this.$emit('input', this.interanlVal);
        }
    },
}
</script>
