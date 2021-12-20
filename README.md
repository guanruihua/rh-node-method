# RH-node-method

## 代码生成器

1. 模板文件[ 填写好对应标识符 ]
2. 写好标识符对应模板文件使用的配置文件

```js
const config = {
  fields:[field1, field2, field3,  ...], // 全部字段
  // 全局代码片段
  global:{
    [_name]: function(field = ''){
      return `...${field}...`
    }
  }
  rules:{
    [fileName1.js]:{
      // 当前文件使用的字段
      fields:[field2, field3], // 不定义的key, 对应使用字段, 都是用该默认值
      all: [field2],// 表示_all, 只会遍历该数组进行生成

      // 对每个指令进行特殊配置(优先级最高)
      [_name]:{
        [fieldName1]: 'name2',
        [fieldName1]: function(field){/* 定义返回值 */},
      },

      // 默认拥有的 生成
      // ${all} => field2, fields3

      // ${list} => use 全部字段都使用_list 方法进行生成
      $list:function(field){
        return `... ${field} ...`
      },

      // 自定义
      $tmpName: function(field){

      }
      [$名称]:function(field){
        return ` 代码片段 `
      },

    },
    [fileName2.js]:{
      // ...
    }
  }
}
```

```js
 // 'Filter.js': {
  //  fieldsConfig: {
  //   fields: ['name1', 'name2', 'name3|select|names|\n\t\t\t\t\t'],
  //   functionKey: 'filter',
  //   // keepParentheses: false,// 是否保留{}括号, 默认false
  //   format: '\n\n\t\t\t'
  //  },
  //  fieldConfig: {

  //  }
  // },
  // 'service.js': {
  //  fieldsConfig: {
  //   fields: [
  //    'query|/apiProduct/productAttrSearch/findPage|get',
  //    'query2|/apiProduct/productAttrSearch/findPage2|post',
  //    'query3|/apiProduct/productAttrSearch/findPage3|delete',
  //   ],
  //   functionKey: 'service'
  //  },
  // },
  // 'Modal.js': {
  //  fieldsConfig: {
  //   fields: ['name1', 'name2|inputNumber', 'name3|select|names|\n\t\t\t\t\t'],
  //   functionKey: 'modal',
  //   format: '\n\t\t\t\t\t',
  //  },
  //  fieldConfig: {
  //   fields: ['name1', 'name2', 'name3', 'name3']
  //  }
  // }

  
 }
```
