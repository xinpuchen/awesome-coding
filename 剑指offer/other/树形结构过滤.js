/*
 * 实现一个对树型结构进行过滤的函数，其中树形结构的格式如下：
 *
 * tree = [
 *   {name: 'A'},
 *   {name: 'B', children: [
 *       {name: 'A'},
 *       {name: 'AA', children: [...]}
 *   ]},
 *   {name: 'C'}
 * ]
 *
 * 1. 假设我输入的 str 为 A 则过滤后返回的结果为
 * [
 *   {name: 'A'},
 *   {name: 'B', children: [
 *       {name: 'A'}
 *   ]}
 * ]
 *
 * 2. 假设我输入的 str 为 AA 则过滤后返回的结果为
 * [
 *   {name: 'B', children: [
 *       {name: 'AA', children: [...]}
 *   ]}
 * ]
 *
 * 提示：实现该函数，要求不允许对原有的tree做任何修改，最终返回结果是一棵新结构出来的树
 */

const tree = [
    {name: 'A'},
    {name: 'B', children: [
        {name: 'A', children: [
          {name: 'A'},
          {name: 'AA'}
        ]},
        {name: 'AA'}
    ]},
    {name: 'C'}
];

function filter (tree, str) {
    const result = [];
    for(let t of tree){
        const obj = {};
        if(t.name === str){
            obj.name = t.name;
            if(t.children){
              obj.children = [...t.children];
            }
        } else if(t.children){
          const children = filter([...t.children], str);
          if(children.length) {
            obj.name = t.name;
            obj.children = children;
          }
        }
        if(obj.name){
          result.push(obj);
        }
    }
    return result;
}
console.log(filter(tree, 'A'));
