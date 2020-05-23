#

> ### POST /register
>
> > ### 请求：
> >
> > > ### `body` <kbd>object</kbd>
> > >
> > > > `username` <kbd>string</kbd>
> > > >
> > > > `password` <kbd>string</kbd>
> > >
> > > <br>
> >
> > <br>
>
> > ### 响应：
> >
> > > ### `code` <kbd>object</kbd>
> > >
> > > > `3001` <kbd>string</kbd> 收到的注册的数据为 nul
> > > >
> > > > `3002` <kbd>string</kbd> 收到的 value 为 null
> > > >
> > > > `3003` <kbd>string</kbd> 数据库查找 err
> > > >
> > > > `3004` <kbd>string</kbd> 数据库插入 err
> > > >
> > > > `3005` <kbd>string</kbd> 数据库插入新用户成功，但 token 生成失败
> > > >
> > > > `3006` <kbd>string</kbd> 数据库插入新用户成功，生成的 encoded 未定义
> > > >
> > > > `3007` [header]() <kbd>string</kbd> 数据库插入新用户成功，token 生成成功
> > > >
> > > > `3008` <kbd>string</kbd> 该用户已存在
> > > >
> > > > `3009` <kbd>string</kbd> 数据库存在多个重复用户
> > >
> > > ### `header` [3007]() <kbd>object</kbd>
> > >
> > > > `token` <kbd>string</kbd> user_id+username+password
> > >
> > > <br>
> >
> > <br>
>
>  <br>
