# 箭头函数使用方式

1. 如果函数定义时为箭头函数

    ```js
        const handler = () => {
            ...
        }
        // 在标签中调用的时候，则不能使用箭头函数使用
        <Button onClick={increment}>+</Button>    正确
        //<Button onClick={() => increment}>+</Button>  错误
        <Button onClick={() => increment()}>+</Button>  正确
        否则无法调用到方法，因为如果直接写 `increment()` 就在页面解析的时候就调用个了，如果已经定义的时箭头函数，那么`() => increment` 这样指向的时函数的引用，在调用的时候，会执行这个箭头函数，箭头函数执行这个引用，因为时引用，所以不会执行定义的函数
        那么下面的就很好理解，执行箭头函数，箭头函数就会执行`increment()` 这个就相当于执行调用并执行了
    ```

2. 通过bind() apply call() 等绑定this指向
