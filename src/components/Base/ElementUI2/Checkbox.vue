<script>
export default {
    name: 'El2Checkbox',
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: [String, Number, Boolean],
        text: String,
        checkboxButton: Boolean,
    },
    methods: {
        onChnage(event) {
            this.$emit('change', event);
        }
    },
    render(h) {
        const self = this;

        if (this.checkboxButton) {
            return (
                <el-checkbox-button
                    value={ this.value }
                    vOn:change={ self.onChnage }
                    {...{ attrs: this.$attrs }}
                >
                    { this.text }
                </el-checkbox-button>
            )
        }

        return (
            <el-checkbox
                value={ this.value }
                vOn:change={ self.onChnage }
                {...{ attrs: this.$attrs }}
            >
                { this.text }
            </el-checkbox>
        )
    }
}
</script>
