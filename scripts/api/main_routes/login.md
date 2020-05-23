#

> ### POST /login
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
> > > > `1001` <kbd>string</kbd> 收到的登陆的数据为 null
> > > >
> > > > `1002` <kbd>string</kbd> 收到的 value 为 null
> > > >
> > > > `1003` <kbd>string</kbd> 数据库查找 err
> > > >
> > > > `1004` <kbd>string</kbd> 该用户未被注册
> > > >
> > > > `1005` <kbd>string</kbd> 密码正确，但 token 生成 err
> > > >
> > > > `1006` <kbd>string</kbd> 密码正确，但 token 生成的 encoded 未定义
> > > >
> > > > `1007` [header]() <kbd>string</kbd> 密码正确，且 token 生成成功
> > > >
> > > > `1008` <kbd>string</kbd> 密码错误
> > > >
> > > > `1009` <kbd>string</kbd> 数据库存在重复的用户账号
> > >
> > > ### `header` [1007]() <kbd>object</kbd>
> > >
> > > > `token` <kbd>string</kbd> user_id+username+password
> > >
> > > <br>
> >
> > <br>
>
>  <br>
