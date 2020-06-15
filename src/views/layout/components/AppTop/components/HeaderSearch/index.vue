<template>
    <el-select
        ref="headerSearchSelect"
        v-model="search"
        :remote-method="_querySearch"
        :size="$size"
        filterable
        default-first-option
        remote
        placeholder="快速搜索页面"
        @change="_change"
        @blur="_blur">
        <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.title.join(' > ')"
            :value="item">
        </el-option>
    </el-select>
</template>

<script>
import Fuse from 'fuse.js'

export default {
    data(){
        return {
            fuse  : null,
            search: '',
            searchList: [],
            options: []
        }
    },
    computed: {
        $size(){
            return this.$store.getters.size;
        },
        $routes(){
            let routes = this.$store.getters.routes;
            if(!routes || !routes.length) return [];

            return routes;
        },
    },
    watch: {
        $routes(){
            this.searchList = this._generateRoutes(this.$routes);
            console.log(this.searchList)
        },
        searchList(){
            this._initFuse(this.searchList);
        }
    },
    mounted(){
        this.searchList = this._generateRoutes(this.$routes);
    },
    methods: {
        _initFuse(list) {
            this.fuse = new Fuse(list, {
                shouldSort: true,        // 应该按照匹配度排序
                threshold: 0.4,          // 匹配阀值
                location: 0,             // 模式大致位置
                distance: 100,           // 确定匹配与模糊位置（由位置指定）的距离
                maxPatternLength: 32,    // 最大解析长度
                minMatchCharLength: 1,   // 最少查询字符长度
                keys: [{                 // 确定查找项
                    name: 'title',
                    weight: 0.7          // 权重值
                }, {
                    name: 'path',
                    weight: 0.3
                }]
            })
        },
        _querySearch(query){
            if(!query){
                this.options = [];
            }else{
                try {
                    this.options = this.fuse.search(query)
                } catch (error) {
                    this.options =  [];
                }
            }
        },
        _generateRoutes(routes, parentTitles=[]){
            let list = [];

            routes.forEach(r => {
                if(!r.show) return;

                let item = {
                    path : r.path,
                    title: [...parentTitles]
                };

                if( r.meta && r.meta.title ){
                    item.title.push(r.meta.title);

                    if( r.redirect !== 'noredirect' ){
                        list.push(item);
                    }
                }

                if( r.children && r.children.length ){
                    let childrenList = this._generateRoutes(r.children, item.title)

                    if (childrenList.length >= 1) {
                        list = [...list, ...childrenList];
                    }
                }
            })

            return list;
        },
        _change(item){
            this.$router.push(item.path);

            this.search  = '';
            this.options = [];
        },
        _blur(){
            // this.search  = '';
            // this.options = [];
        }
    }
};
</script>
