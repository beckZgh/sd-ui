
## 文档所有 `API` 统一约定返回字段
- `ok`   为当前请求接口返回状态
- `data` 为当前请求接口返回数据

> 后续接口返回的参数,均属于 `data` 对象下

``` json
// success
{
    "ok": true,
    "data": [], // [] or {}
}

// error
{
    "ok": false,
    "err": "error message"
}
```
