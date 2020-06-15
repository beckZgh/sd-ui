<template>
    <div class="login-wrap">
        <div class="login-form">
            <div class="login-logo">
                <img src="@/assets/logo.png" alt="LoGo" />
            </div>
            <el2-form ref="el2Form" v-model="form" :config="config" isCustom @enter="_login">
                <template #custom="{ scope }">
                    <el-form-item
                        v-for="f in scope.fields"
                        :key="f.prop"
                        :prop="f.prop"
                        v-bind="f.itemAttrs"
                    >
                        <span class="login-svg">
                            <svg-icon :icon-class="f.attrs.icon"></svg-icon>
                        </span>
                        <el-input
                            v-model.trim="scope.form[f.prop]"
                            :autofocus="f.prop === 'cid'"
                            :type="(f.prop === 'psw' && pswType) || 'text'"
                            :placeholder="f.attrs.placeholder"
                        />
                        <span v-if="f.prop === 'psw'" class="show-pwd" @click="_showPwd">
                            <svg-icon :icon-class="pswType === 'password' ? 'eye' : 'eye-open'" />
                        </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="loading"
                            type="primary"
                            class="w100"
                            size="large"
                            @click="_login"
                        >
                            登 录
                        </el-button>
                    </el-form-item>
                </template>
            </el2-form>
        </div>
    </div>
</template>

<script>
import El2Form from '@/components/El2Form';

export default {
    name: 'Login',
    components: { El2Form },
    data() {
        return {
            redirect: '',
            loading: false,
            pswType: 'password',
            form: {
                cid: '',
                uid: '',
                psw: '',
            },
            config: [
                {
                    prop: 'cid',
                    label: '商户',
                    itemAttrs: {
                        rules: { required: true, message: '商户不能为空' },
                    },
                    attrs: {
                        icon: 'company',
                        placeholder: '请输入商户编码',
                    },
                },
                {
                    prop: 'uid',
                    label: '账号',
                    itemAttrs: {
                        rules: { required: true, message: '账号不能为空' },
                    },
                    attrs: {
                        icon: 'account',
                        placeholder: '请输入账号',
                    },
                },
                {
                    prop: 'psw',
                    label: '密码',
                    itemAttrs: {
                        rules: { required: true, message: '密码不能为空' },
                    },
                    attrs: {
                        icon: 'password',
                        placeholder: '请输入密码',
                    },
                },
            ],
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    created() {
        const map = JSON.parse(localStorage.getItem('loginInfo')) || {};
        const form = this.form;
        for (let k in this.form) {
            if (this.form.hasOwnProperty(k)) {
                form[k] = map[k] || '';
            }
        }
        form.psw = '';
    },
    methods: {
        _showPwd() {
            this.pswType = this.pswType === 'password' ? 'text' : 'password';
        },
        _login() {
            this.$refs.el2Form.validate(valid => {
                if (!valid) return false;

                this.loading = true;
                this.$store
                    .dispatch('user/login', this.form)
                    .then(res => {
                        const form = this.form;
                        const storage = { cid: form.cid, uid: form.uid };

                        localStorage.setItem('loginInfo', JSON.stringify(storage));
                        this.$router.push({ path: this.redirect || '/' });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
$dark_gray: #889aa4;

.login-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background: $bg;

    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }

    .login-svg {
        display: inline-block;
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
    }

    .login-logo {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}

.login-wrap ::v-deep {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background-color: transparent;
            border: 0px;
            -webkit-appearance: none;
            appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;

            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .el-form-item__error {
        padding-top: 4px;
    }
}
</style>
