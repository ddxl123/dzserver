# 基本完整

> ### GET /no_id/home_page/get_dz
>
> > ### 请求：
> >
> > > ### `query` <kbd>object</kbd>
> > >
> > > > `sort_method` <kbd>string</kbd> 随机?最新
> > > >
> > > > `any` <kbd>string</kbd> 最新-上次的最旧时间?最新-上次的最旧时间
> > >
> > > <br>
> >
> > <br>
>
> > ### 响应：
> >
> > > ### `code` <kbd>object</kbd>
> > >
> > > > `5001` <kbd>string</kbd> 接收到的 query 为 null
> > > >
> > > > `5002` <kbd>string</kbd> 数据库查询成功
> > > >
> > > > `5003` <kbd>string</kbd> 数据库查询 err
> > > >
> > > > `5004` [data]() <kbd>string</kbd>
> > > >
> > > > `5005` <kbd>string</kbd> 查找 review_show 的 user_id 失败
> > >
> > >  <br>
> >
> > > ### `data` [5004]() <kbd>object</kbd>
> > >
> > > > `dz_id` <kbd>string</kbd>
> > > >
> > > > `user_id` <kbd>string</kbd>
> > > >
> > > > `title` <kbd>string</kbd>
> > > >
> > > > `short_content` <kbd>string</kbd>
> > > >
> > > > `update_time` <kbd>int</kbd>
> > > >
> > > > `username` <kbd>string</kbd>
> > > >
> > > > `user_icon` <kbd>int</kbd>
> > > >
> > > > `review_count` <kbd>int</kbd>
> > > >
> > > > `review0` <kbd>object</kbd>
> > > >
> > > > > `reviewer_user_id` <kbd>string</kbd>
> > > > >
> > > > > `content` <kbd>string</kbd>
> > > > >
> > > > > `reviewer_username` <kbd>string</kbd>
> > > >
> > > > `review1` <kbd>object</kbd>
> > > >
> > > > > `reviewer_user_id` <kbd>string</kbd>
> > > > >
> > > > > `content` <kbd>string</kbd>
> > > > >
> > > > > `reviewer_username` <kbd>string</kbd>
> > > >
> > > > <br>
> > >
> > > <br>
> >
> > <br>
>
>  <br>
