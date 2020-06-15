<script>
export default {
    name: 'El2Select',
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: [String, Number, Boolean, Array],
        options : {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onChnage(event) {
            this.$emit('change', event);
        }
    },
    render(h) {
        const self = this;

        return (
            <el-select
                value={ this.value }
                vOn:change={ self.onChnage }
                { ...{ attrs: this.$attrs } }
            >
                {
                    this.options.map((item, index) => {
                        return (
                            <el-option
                                key={ index }
                                { ...{ attrs: item } }
                            />
                        )
                    })
                }
            </el-select>
        )
    }
}
</script>
