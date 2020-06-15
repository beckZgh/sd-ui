<template>
    <component :is="isCom(to)" v-bind="linkProps(to)"><slot/></component>
</template>

<script>
import { isExternal } from '@/utils/validate';

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        isCom(url){
            return isExternal(url) && 'a' || 'router-link'; 
        },
        linkProps(url){
            if(isExternal(url)){
                return {
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }else {
                return {
                    to: url
                }
            }
        }
    }
};

</script>
