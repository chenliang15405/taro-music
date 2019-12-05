### classnames库

> react中无法给一个元素添加多个元素，所以可以通过classnames添加多个class，也可以动态添加class,github: https://github.com/JedWatson/classnames

1. 一个元素设置两个class
`classNames('foo', 'bar'); // => 'foo bar'`

2. 动态设置添加class
```js
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
```

3. 设置变量
```js
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```
