# redux中使用hooks

1. 使用useSelector时类型：
`useSelector(state => state.user)` 这样会报错，state的类型是unknow类型，无法获取到其中的user, 运行不影响，但是编辑器会报错，需指定类型`useSelector((state: IUSER) => state.user)`
