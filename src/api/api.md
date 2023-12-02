 
 
article_collect(req)
收藏
params: {"token": "token", "article_id": "article_id"}
return: {}
article_comment_del(req)
删除文章评论
params: {"token": "token", "article_comment_id_list": ["article_comment_id1", "article_comment_id2", ...]}
return: {}
article_comment_list(req)
读文章评论列表（分页）
params: {"token": "token", "article_id": "article_id", "limit": 100, "offset": 0}
return: {'article_comment_list': [{'comment_id': 64, 'uid': '1143566535c34c5baef560de31fa5a6e', 'content': 'hello', 'reply_id': 53, 'reply_uid': '1143566535c34c5baef560de31fa5a6e', 'first_reply_id': 53, 'first_reply_uid': '1143566535c34c5baef560de31fa5a6e', 'created_at': 1701061051887, 'up_count': 0, 'down_count': 0, 'is_up': False, 'is_down': False, 'author': {'nickname': 'nick-18682222222', 'avatar': None}, 'reply_author': {'nickname': 'nick-18682222222', 'avatar': None}, 'first_reply_author': {'nickname': 'nick-18682222222', 'avatar': None}}...], 'code': 0}
article_comment_publish(req)
文章评论发表
params: {"token": "token", "article_id": "article_id", "content": "content"}
return: {}
article_comment_reply(req)
文章评论回复
params: {"token": "token", "article_id": "article_id", "reply_id": "comment_id", "content": "content", "first_reply_id": "comment_id"}
return: {}
article_comment_up(req)
评论点赞(顶)
params: {"token": "token", "article_comment_id": "article_comment_id"}
return: {}
article_del(req)
删除文章 (只能删除自己发的, 一次最多100篇)
params: {"token": "token", "article_id_list": "article_id_list"}
return: {}
article_detail(req)
读文章详情 + 100条评论 收藏点赞
params: {"token": "token", "article_id": "article_id"}
return: {'article_detail': {'article_id': 60, 'content': 'qwertyuiopasdfghjklzxcvbnnm-9', 'images': ['e4cbdd56-855a-11ee-bcb6-5785abdd6148.jpeg', 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg'], 'created_at': 1701061051684, 'like_user_list': [], 'collect_user_list': [], 'comment_list': [{'comment_id': 53, 'uid': '1143566535c34c5baef560de31fa5a6e', 'content': 'comment-00000', 'reply_id': None, 'reply_uid': None, 'first_reply_id': None, 'first_reply_uid': None, 'created_at': 1701061051814, 'up_count': 0, 'down_count': 0, 'is_up': False, 'is_down': False, 'author': {'nickname': 'nick-18682222222', 'avatar': None}}], 'author': {'uid': '1143566535c34c5baef560de31fa5a6e', 'nickname': 'nick-18682222222', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'intro': None, 'created_at': 1701059268775, 'is_follow': False}, 'is_like': False, 'is_collect': False}, 'code': 0}
article_like(req)
点赞
params: {"token": "token", "article_id": "article_id"}
return: {}
article_list(req)
读文章列表（分页）-- 在首页秀场里展示
params: {"token": "token", "limit": 20, "offset": 0}
return: {'article_list': [{'article_id': 60, 'uid': '1143566535c34c5baef560de31fa5a6e', 'content': 'qwertyuiopasdfghjklzxcvbnnm-9', 'images': ['e4cbdd56-855a-11ee-bcb6-5785abdd6148.jpeg', 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg'], 'created_at': 1701061051684, 'like_count': 0, 'collect_count': 0, 'comment_count': 0, 'is_like': False, 'is_collect': False, 'author': {'uid': '1143566535c34c5baef560de31fa5a6e', 'nickname': 'nick-18682222222', 'avatar': None}}...]}
article_publish(req)
发布文章（文字，0-9张图片）
params: {"token": "token", "content": "content", "images": ["image_1", "image_2", ...]}
return: {}
article_uncollect(req)
取消收藏
params: {"token": "token", "article_id": "article_id"}
return: {}
article_unlike(req)
取消点赞
params: {"token": "token", "article_id": "article_id"}
return: {}
current_time(req)
取系统当前时间 (不用登录可用)
params: {}
return: {"time": server timestamp}
design_circle_banner(req)
读设计圈banner
params: {"token": "token"}
return: {"design_circle_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
design_circle_cloth_collect(req)
对设计圈服饰收藏
params: {"token": "token", "cloth_id": "cloth_id"}
return: {}
design_circle_cloth_detail(req)
读设计圈服饰详情
params: {"token": "token", "cloth_id": "cloth_id"}
return: {'design_circle_cloth_detail': {'cloth_id': 20, 'name': '服饰名称19', 'image': 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '服饰简介19', 'price': 2999, 'designer_intro': '', 'dynasty': 1, 'created_at': 1700723076577, 'is_collect': True/False}, 'code': 0}
design_circle_cloth_list(req)
读设计圈服饰列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"design_circle_cloth_list": [{'cloth_id': 20, 'name': '服饰名称19', 'image': 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '服饰简介19', 'price': 2999, 'dynasty': 1, 'created_at': 1700723076577}, ...]}
design_circle_cloth_uncollect(req)
对设计圈服饰取消收藏
params: {"token": "token", "cloth_id": "cloth_id"}
return: {}
following_article_list(req)
读我关注的人的文章列表（分页）-- 在首页关注里展示
params: {"token": "token", "limit": 20, "offset": 0}
return: {'following_article_list': [{'article_id': 60, 'uid': '1143566535c34c5baef560de31fa5a6e', 'content': 'qwertyuiopasdfghjklzxcvbnnm-9', 'images': ['e4cbdd56-855a-11ee-bcb6-5785abdd6148.jpeg', 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg'], 'created_at': 1701061051684, 'like_count': 0, 'collect_count': 0, 'comment_count': 0, 'is_like': False, 'is_collect': False, 'author': {'uid': '1143566535c34c5baef560de31fa5a6e', 'nickname': 'nick-18682222222', 'avatar': None}}...]}
game_banner(req)
读游戏banner
params: {"token": "token"}
return: {"design_circle_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
game_collect(req)
游戏收藏
params: {"token": "token", "game_id": "game_id"}
return: {}
game_comment_del(req)
游戏评论删除
params: {"token": "token", "comment_id": "comment_id_list"}
return: {}
game_comment_down(req)
游戏评论踩
params: {"token": "token", "comment_id": "comment_id"}
return: {}
game_comment_list(req)
游戏评论列表（分页）
params: {"token": "token", "game_id": "game_id", "limit": 100, "offset": 0}
return: {'game_comment_list': [{'comment_id': 47, 'uid': '6ae70652c1d24ab092fd579827534fce', 'content': 'test_game_comment', 'reply_id': None, 'created_at': 1700750691862}...]}
game_comment_publish(req)
游戏评论发表
params: {"token": "token", "game_id": "game_id", "content": "content"}
return: {}
game_comment_up(req)
游戏评论顶
params: {"token": "token", "comment_id": "comment_id"}
return: {}
game_detail(req)
游戏详情
params: {"token": "token", "game_id": "game_id"}
return: {'game_detail': {'game_id': 1, 'name': '游戏名称0', 'image': 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '游戏简介0', 'created_at': 1700723076581, 'is_collect': False}, 'code': 0}
game_like(req)
游戏点赞
params: {"token": "token", "game_id": "game_id"}
return: {}
game_recommend_list(req)
系统推荐游戏列表（分页）
params: {"token": "token"}
return: {'game_recommend_list': [{'game_id': 1, 'name': '游戏名称0', 'image': 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '游戏简介0', 'created_at': 1700723076581, 'is_collect': False}...]}
game_uncollect(req)
游戏取消收藏
params: {"token": "token", "game_id": "game_id"}
return: {}
game_unlike(req)
游戏取消点赞
params: {"token": "token", "game_id": "game_id"}
return: {}
get_media_id(req)
获取媒体文件ID
params: {"token": "token"}
return: {"media_id": "media_id"}
home_banner(req)
读首页banner
params: {"token": "token"}
return: {"home_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
master_detail(req)
达人详情
params: {"token": "token", "master_id": "master_id"}
return: {'master_detail': {'master_id': 'ef1b95c82f4b47c2841d9c0c095a558b', 'name': '达人0', 'avatar': 'e35d9e3e-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介0', 'address': '北京市海淀区中关村0号', 'birthday': '1990-01-01', 'is_follow': False, 'follow_count': 0, 'article_count': 0, 'follower_count': 0, 'created_at': 1701075470849}, 'code': 0}
master_follow(req)
关注用户
params: {"token": "token", "master_id": "master_id"}
return: {}
master_list(req)
达人列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"master_list": [{"uid": "uid", "nickname": "nickname", "avatar": "avatar", "intro": "intro", "is_follow": True/Flase, "created_at": ts }, ...]}
master_recommend_list(req)
推荐达人列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"master_list": [{"uid": "uid", "nickname": "nickname", "avatar": "avatar", "intro": "intro", "created_at": ts}, ...]
master_unfollow(req)
取消关注用户
params: {"token": "token", "master_id": "master_id"}
return: {}
merchant_cloth_collect(req)
对商家服饰收藏
params: {"token": "token", "cloth_id": "cloth_id"}
return: {}
merchant_cloth_detail(req)
读商家服饰详情
params: {"token": "token", "cloth_id": "cloth_id"}
return: {"merchant_cloth_detail": {"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, 'dynasty': 1, "created_at": ts, 'is_collect': True/False, 
'merchant': {
        'merchant_id': merchant_id,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro,
        'address': merchant_address,
        'is_follow': True/False,
        'follow_count': 0
    }}}
merchant_cloth_list(req)
读商家服饰列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"merchant_cloth_list": [{"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, 'dynasty': 1, "created_at": ts, 'is_collect': True/False,
'merchant': {
        'merchant_id': merchant_id,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro,
        'address': merchant_address,
        'is_follow': True/False
    }}, ...]}
merchant_cloth_recommend_list(req)
系统推荐商家服饰列表（分页）
 params: {"token": "token", "limit": 100, "offset": 0}
return: {"merchant_cloth_list": [{"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, 'dynasty': 1, "created_at": ts, 'is_collect': True/False,
'merchant': {
        'merchant_id': merchant_id,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro,
        'address': merchant_address,
        'is_follow': True/False
    }}, ...]}
merchant_cloth_uncollect(req)
对商家服饰取消收藏
params: {"token": "token", "cloth_id": "cloth_id"}
return: {}
merchant_follow(req)
关注商家
params: {"token": "token", "merchant_id": "merchant_id"}
return: {}
merchant_unfollow(req)
取消关注商家
params: {"token": "token", "merchant_id": "merchant_id"}
return: {}
message_del(req)
删除私信
params: {"token": "token", "message_id_list": ["message_id1", "message_id2", ...]}
return: {}
my_article_collect_list(req)
我收藏的文章列表（分页）
params: {"token": "token"}
return: {'my_article_collect_list': [{'article_id': 17, 'content': 'qwertyuiopasdfghjklzxcvbnnm-9', 'images': ['e6e00ede-855a-11ee-bcb6-5785abdd6148.jpeg', 'f2bf36d8-855a-11ee-bcb6-5785abdd6148.jpeg', 'f0ad3cc8-855a-11ee-bcb6-5785abdd6148.jpeg'], 'created_at': 1701077825969, 'like_count': 0, 'collect_count': 1, 'comment_count': 0}...]}
my_article_list(req)
读我的文章列表（分页）-- 在我的笔记里展示
params: {"token": "token", "limit": 20, "offset": 0}
return: {'my_article_list': [{'article_id': 60, 'uid': '1143566535c34c5baef560de31fa5a6e', 'content': 'qwertyuiopasdfghjklzxcvbnnm-9', 'images': ['e4cbdd56-855a-11ee-bcb6-5785abdd6148.jpeg', 'e87dbff1-855a-11ee-bcb6-5785abdd6148.jpeg', 'f1abbc30-855a-11ee-bcb6-5785abdd6148.jpeg'], 'created_at': 1701061051684, 'like_count': 0, 'collect_count': 0, 'comment_count': 0, 'is_like': False, 'is_collect': False}...]}
my_follower(req)
我的粉丝
params: {"token": "token"}
return: {'my_follower': [{'uid': '5c3358e0727848c195fc23c72fa220cb', 'nickname': 'nick-18683333333', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'intro': None, 'created_at': 1700722804842}], 'code': 0}
my_following_masters(req)
我关注的达人
params: {"token": "token"}
return: {'my_following_masters': [{'master_id': 'bcedd63f179848a8bdc4ab4126b8119d', 'name': '达人0', 'avatar': 'ef203694-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介0', 'address': '北京市海淀区中关村0号', 'birthday': '1990-01-01', 'created_at': 1700723076574}], 'code': 0}
my_following_masters_project_list(req)
我关注的达人的项目列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {'project_recommend_list': [{'project_id': 1, 'name': '项目名称0', 'image': 'e5df9161-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '项目简介0', 'created_at': 1700748733467, 'master': {'master_id': 'bcedd63f179848a8bdc4ab4126b8119d', 'name': '达人0', 'avatar': 'ef203694-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介0', 'address': '北京市海淀区中关村0号', 'birthday': '1990-01-01', 'is_follow': False, 'created_at': 1700723076574}}...], 'code': 0}
my_following_merchants(req)
我关注的商家
params: {"token": "token"}
return: {'my_following_merchants': [{'merchant_id': 'f10e8d4f1e7f44598cec660bce874490', 'name': '商户9', 'logo': 'f0ad3cc9-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '商户简介9', 'address': '北京市海淀区中关村9号', 'phone': '18888888888', 'email': 'xxx@163.com', 'created_at': 1700723076573}], 'code': 0}
my_following_users(req)
我关注的用户
params: {"token": "token"}
return: {'my_following_users': [{'uid': '0abea4cf4db842a2aef6fbcdcce08e92', 'nickname': 'nick-18685555555', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'intro': None, 'created_at': 1700722804842}, {'uid': '5c3358e0727848c195fc23c72fa220cb', 'nickname': 'nick-18683333333', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'intro': None, 'created_at': 1700722804842}], 'code': 0}
my_message(req)
读私信列表 （分页）
params: {"token": "token", "to_id": "to_id", "limit": 100, "offset": 0}
return: {"my_message": [{"message_id": "message_id", "from_id": "from_id", "to_id": "to_id", "content": "content", "created_at": ts}, ...]}
my_order_list(req)
我的订单列表（分页） (status 0-待支付 1-已完成 2-已取消，不传status时返回所有订单)
params: {"token": "token", "status": 0, "limit": 100, "offset": 0}
return: {'my_order_list': [{'order_id': 1, 'uid': '6ae70652c1d24ab092fd579827534fce', 'price': 1999, 'status': 2, 'created_at': 1700750273542, 'updated_at': 1700750817533}, {'order_id': 2, 'uid': '6ae70652c1d24ab092fd579827534fce', 'price': 1999, 'status': 0, 'created_at': 1700750273542, 'updated_at': 1700750273542}...]}
my_ticket_list(req)
读我的票列表（分页）（已购买）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"my_ticket_list": [{"ticket_id": "ticket_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts}, ...]
my_user_info(req)
读个人信息
params: {"token": "token"}
return: {'my_user_info': {'uid': 'f29880611d884a52bdf37982fa4dff19', 'nickname': 'test', 'avatar': 'image_id', 'gender': 1, 'country': '86', 'province': '广东省', 'city': '深圳市', 'birthday': 1701074685929, 'phone': '18682222222', 'email': 'xxx@163.com', 'category': 0, 'status': 0, 'score': 0, 'level': 0, 'exp': 0, 'invitation_code': None, 'inviter': None, 'intro': 'test_intro', 'created_at': 1701074039152, 'follow_count': 1, 'follower_count': 2, 'article_count': 24}, 'code': 0}
my_user_info_update(req)
写个人信息
params: {"token": "token",'nickname': 'test', 'avatar': 'image', 'gender': 1, 'province': '广东省', 'city': '深圳市', 'birthday': 1699708371238, 'email': 'xxx@163.com', 'intro': 'test_intro'}
return: {}
order_cancel(req)
取消订单
params: {"token": "token", "order_id": "order_id"}
return: {}
order_create(req)
创建订单 (直接购买)
params: {"token": "token", "ticket_id_list": ["ticket_id1", "ticket_id2", ...]}
return: {}
order_create_by_shopping_cart(req)
创建订单（购物车）
params: {"token": "token", "ticket_id_list": ["ticket_id1", "ticket_id2", ...]}
return: {}
order_detail(req)
读订单详情
params: {"token": "token", "order_id": "order_id"}
return: {'order_detail': {'order_id': 1, 'uid': '6ae70652c1d24ab092fd579827534fce', 'price': 1999, 'status': 2, 'created_at': 1700750273542, 'updated_at': 1700750817533, 'order_item_list': [{'ticket_id': 1, 'price': 1999, 'created_at': 1700750273543, 'updated_at': 1700750273543}]}, 'code': 0}
order_pay(req)
订单支付
project_detail(req)
项目详情
params: {"token": "token", "project_id": "project_id"}
return: {'project_detail': {'project_id': 200, 'name': '项目名称9', 'image': 'e986c93d-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '项目简介9', 'created_at': 1700748733467, 'master': {'master_id': '3cd115bb5e1c4e5baa2137c4e58efd34', 'name': '达人19', 'avatar': 'f0ad3cc8-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介19', 'address': '北京市海淀区中关村19号', 'birthday': '1990-01-01', 'is_follow': False, 'created_at': 1700723076574}, "ticket_count": 100}, 'code': 0}
project_list(req)
项目列表（分页）master_id=None时，返回所有项目, 否则返回这个达人的项目
params: {"token": "token", "master_id": "master_id", "limit": 100, "offset": 0}
return: {'project_list': [{'project_id': 1, 'name': '项目名称0', 'image': 'e5df9161-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '项目简介0', 'created_at': 1700748733467, 'master': {'master_id': 'bcedd63f179848a8bdc4ab4126b8119d', 'name': '达人0', 'avatar': 'ef203694-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介0', 'address': '北京市海淀区中关村0号', 'birthday': '1990-01-01', 'is_follow': False, 'created_at': 1700723076574}}...], 'code': 0}
project_recommend_list(req)
系统推荐的项目列表
params: {"token": "token", "limit": 100, "offset": 0}
return: {'project_recommend_list': [{'project_id': 1, 'name': '项目名称0', 'image': 'e5df9161-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '项目简介0', 'created_at': 1700748733467, 'master': {'master_id': 'bcedd63f179848a8bdc4ab4126b8119d', 'name': '达人0', 'avatar': 'ef203694-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '达人简介0', 'address': '北京市海淀区中关村0号', 'birthday': '1990-01-01', 'is_follow': False, 'created_at': 1700723076574}}...], 'code': 0}
send_message_to_customer_service(req)
发送私信给客服
params: {"token": "token", "content": "content"}
return: {}
send_message_to_master(req)
发送私信给达人
params: {"token": "token", "master_id": "master_id", "content": "content"}
return: {}
send_message_to_merchant(req)
发送私信给商家
params: {"token": "token", "merchant_id": "merchant_id", "content": "content"}
return: {}
send_message_to_user(req)
发送私信给用户
params: {"token": "token", "to_uid": "to_uid", "content": "content"}
return: {}
send_sms_code(req)
发送短信验证码 (不用登录可用)
params: {"country": "86", "phone": "13800138000"}
return: {}
shopping_cart_add(req)
添加商品到购物车
params: {"token": "token", "ticket_id": "ticket_id"}
return: {}
shopping_cart_del(req)
移除购物车商品
params: {"token": "token", "ticket_id": "ticket_id"}
return: {}
shopping_cart_info(req)
读购物车信息
params: {"token": "token"}
return: {'shopping_cart_info': [{'ticket_id': 1, 'ticket_name': '票名称0', 'ticket_image': 'f2bf36d8-855a-11ee-bcb6-5785abdd6148.jpeg', 'ticket_intro': '票简介0', 'ticket_price': 1999, 'created_at': 1700749012307, 'updated_at': 1700750849775}], 'code': 0}
ticket_banner(req)
读票儿banner
params: {"token": "token"}
return: {"ticket_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
ticket_detail(req)
读票详情
params: {"token": "token", "ticket_id": "ticket_id"}
return: {"ticket_detail": {"ticket_id": "ticket_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "project_id": 1, "created_at": ts, "updated_at": ts}, "project_ticket_count": 100}
ticket_list(req)
读票列表（分页）(商品，未出售)
params: {"token": "token", "project_id": "project_id", "limit": 100, "offset": 0}
return: {ticket_list': [{'ticket_id': 1, 'name': '票名称0', 'image': 'f2bf36d8-855a-11ee-bcb6-5785abdd6148.jpeg', 'intro': '票简介0', 'price': 1999, 'created_at': 1700748733468}...]}
user_follow(req)
关注用户
params: {"token": "token", "to_uid": "to_uid"}
return: {}
user_info(req)
读他人信息
params: {"token": "token", "to_uid": "to_uid", "phone": "phone"} # to_uid or phone
return: {'user_info': {'uid': 'f29880611d884a52bdf37982fa4dff19', 'nickname': 'test', 'avatar': 'image_id', 'gender': 1, 'country': '86', 'province': '广东省', 'city': '深圳市', 'birthday': 1701074471865, 'score': 0, 'level': 0, 'exp': 0, 'intro': 'test_intro', 'created_at': 1701074039152, 'follow_count': 1, 'follower_count': 2, 'is_follow': False, 'article_count': 24}, 'code': 0}
user_login(req)
手机号登录 （密码）or（短信验证） (不用登录可用)
params: {"country": "86", "phone": "13800138000", "password": "123456"} or {"country": "86", "phone": "13800138000", "code": "123456"}
return: {'token': '6c3e9a94cbf84cada75f8c60c359220e', 'uid': '0abea4cf4db842a2aef6fbcdcce08e92', 'my_user_info': {'uid': '0abea4cf4db842a2aef6fbcdcce08e92', 'nickname': 'nick-18685555555', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'phone': '18685555555', 'email': None, 'category': 0, 'status': 0, 'score': 0, 'invitation_code': None, 'inviter': None, 'intro': None, 'created_at': 1700722804842}}
user_logout(req)
用户登出
params: {"token": "token"}
return: {}
user_password_update(req)
重置密码 （短信验证） (不用登录可用)
params: {"country": "86", "phone": "13800138000", "password": "123456", "code": "123456"}
return: {}
user_signup(req)
手机号注册 （短信验证） (不用登录可用)
params: {"country": "86", "phone": "13800138000", "code": "123456", "password": "123456", "nickname": "nickname"}
return: {'token': '6c3e9a94cbf84cada75f8c60c359220e', 'uid': '0abea4cf4db842a2aef6fbcdcce08e92', 'my_user_info': {'uid': '0abea4cf4db842a2aef6fbcdcce08e92', 'nickname': 'nick-18685555555', 'avatar': None, 'gender': 0, 'country': '86', 'province': None, 'city': None, 'birthday': None, 'phone': '18685555555', 'email': None, 'category': 0, 'status': 0, 'score': 0, 'invitation_code': None, 'inviter': None, 'intro': None, 'created_at': 1700722804842}}
user_unfollow(req)
取消关注用户
params: {"token": "token", "to_uid": "to_uid"}
return: {}
