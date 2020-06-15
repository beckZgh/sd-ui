<script>
export default {
    name: 'El2Radio',
    functional: true,
    props: {
        text: String,
        radioButton: Boolean,
    },
    render(h, ctx) {
        const { props } = ctx;

        if (props.radioButton) {
            return (
                <el-radio-button
                    {...{ attrs: ctx.data.attrs }}
                >
                    { props.text }
                </el-radio-button>
            )
        }

        return (
            <el-radio
                {...{ attrs: ctx.data.attrs }}
            >
                { props.text }
            </el-radio>
        )
    }
}
</script>
