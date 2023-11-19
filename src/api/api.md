 
 
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
return: {"article_comment_list": [{"article_comment_id": "article_comment_id", "uid": "uid", "content": "content", "created_at": ts}, ...]}
article_comment_publish(req)
文章评论发表
params: {"token": "token", "article_id": "article_id", "content": "content"}
return: {}
article_del(req)
删除文章 (只能删除自己的)
params: {"token": "token", "article_id": "article_id"}
return: {}
article_detail(req)
读文章详情 + 100条评论 收藏点赞
params: {"token": "token", "article_id": "article_id"}
return: {"article_detail": {"article_id": "article_id", "uid": "uid", "content": "content", "images": ["image_1", "image_2", ...], "created_at": ts, 'like_count': [uid1, uid2 ...], 'collect_count': [uid1, uid2 ...], 'comment_count': [uid1, uid2 ...]}
article_like(req)
点赞
params: {"token": "token", "article_id": "article_id"}
return: {}
article_list(req)
读文章列表（分页）-- 在首页秀场里展示
params: {"token": "token"}
return: {"article_list": [{"article_id": "article_id", "uid": "uid", "content": "content", "images": ["image_1", "image_2", ...], "created_at": ts, 'like_count': 0, 'collect_count': 0, 'comment_count': 0}, ...]}
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
design_circle_cloth_detail(req)
读设计圈服饰详情
params: {"token": "token", "cloth_id": "cloth_id"}
return: {"design_circle_cloth_detail": {"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts, 'is_like': True/False}}
design_circle_cloth_like(req)
对设计圈服饰点赞
design_circle_cloth_list(req)
读设计圈服饰列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"design_circle_cloth_list": [{"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts, 'is_like': True/False}, ...]}
design_circle_cloth_unlike(req)
对设计圈服饰取消点赞
following_article_list(req)
读我关注的人的文章列表（分页）-- 在首页关注里展示
params: {"token": "token"}
return: {"following_article_list": [{"article_id": "article_id", "uid": "uid", "content": "content", "images": ["image_1", "image_2", ...], "created_at": ts, 'like_count': 0, 'collect_count': 0, 'comment_count': 0}, ...]}
get_master_list(req)
查询达人列表（分页）
params: {"token": "token"}
return: {"master_list": [{"uid": "uid", "nickname": "nickname", "avatar": "avatar", "intro": "intro", "created_at": ts}, ...]
get_media_id(req)
获取媒体文件ID
params: {"token": "token"}
return: {"media_id": "media_id"}
home_banner(req)
读首页banner
params: {"token": "token"}
return: {"home_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
merchant_cloth_detail(req)
读商家服饰详情
params: {"token": "token", "cloth_id": "cloth_id"}
return: {"merchant_cloth_detail": {"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts, 'is_like': True/False, 
'merchant': {
        'uid': merchant_uid,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro,
        'address': merchant_address
    }}}
merchant_cloth_like(req)
对商家服饰点赞
merchant_cloth_list(req)
读商家服饰列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"merchant_cloth_list": [{"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts, 'is_like': True/False,
'merchant': {
        'uid': merchant_uid,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro
    }}, ...]}
merchant_cloth_unlike(req)
对商家服饰取消点赞
message_del(req)
删除私信
params: {"token": "token", "message_id_list": ["message_id1", "message_id2", ...]}
return: {}
my_article_list(req)
读我的文章列表（分页）-- 在我的笔记里展示
params: {"token": "token"}
return: {"my_article_list": [{"article_id": "article_id", "content": "content", "images": ["image_1", "image_2", ...], "created_at": ts, 'like_count': 0, 'collect_count': 0, 'comment_count': 0}, ...]}
my_block(req)
我的拉黑
params: {"token": "token"}
return: {"my_block": ["uid1", "uid2", ...]}
my_follower(req)
我的粉丝
params: {"token": "token"}
return: {"my_follower": ["uid1", "uid2", ...]}
my_following(req)
我的关注
params: {"token": "token"}
return: {"my_following": ["uid1", "uid2", ...]}
my_message(req)
读私信列表 （分页）
params: {"token": "token", "to_uid": "to_uid", "limit": 100, "offset": 0}
return: {"my_message": [{"message_id": "message_id", "from_uid": "from_uid", "to_uid": "to_uid", "content": "content", "created_at": ts}, ...]}
my_order_list(req)
我的订单列表（分页）
params: {"token": "token"}
return: {"my_order_list": [{"order_id": "order_id", "price": 0, "number": 1, "status": 0, "created_at": ts, "updated_at": ts}, ...]}
my_ticket_list(req)
读我的票列表（分页）（已购买）
params: {"token": "token"}
return: {"my_ticket_list": [{"ticket_id": "ticket_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts}, ...]
my_user_info(req)
读个人信息
params: {"token": "token"}
return: {"my_user_info": {'uid': '9b2a3757ed174de88b7b3fdc2247dd7b', 'nickname': 'test', 'avatar': 'image', 'gender': 0, 'country': '86', 'province': '广东省', 'city': '深圳市', 'birthday': 1699708371238, 'phone': '18682222222', 'email': 'xxx@163.com', 'category': 0, 'status': 0, 'score': 0, 'invitation_code': None, 'inviter': None, 'intro': 'test_intro', 'created_at': ts}}
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
params: {"token": "token", "ticket_id_list": ["ticket_id1", "ticket_id2", ...], "number_list": [1, 2, ...]}
return: {}
order_create_by_shopping_cart(req)
创建订单（购物车）
params: {"token": "token", "ticket_id_list": ["ticket_id1", "ticket_id2", ...]}
return: {}
order_detail(req)
读订单详情
params: {"token": "token", "order_id": "order_id"}
return: {"order_detail": {"order_id": "order_id", "price": 0, "number": 1, "status": 0, "created_at": ts, "updated_at": ts, "order_item_list": [{"ticket_id": "ticket_id",  "price": 0, "number": 1}, ...]}}
recommend_merchant_cloth_list(req)
系统推荐商家服饰列表（分页）
params: {"token": "token", "limit": 100, "offset": 0}
return: {"recommend_merchant_cloth_list": [{"cloth_id": "cloth_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "created_at": ts, 'is_like': True/False,
'merchant': {
        'uid': merchant_uid,
        'name': merchant_name,
        'logo': merchant_logo,
        'intro': merchant_intro
    }}, ...]}
send_message(req)
发送私信
params: {"token": "token", "to_uid": "to_uid", "content": "content"}
return: {}
send_sms_code(req)
发送短信验证码 (不用登录可用)
params: {"country": "86", "phone": "13800138000"}
return: {}
shopping_cart_add(req)
添加商品到购物车
params: {"token": "token", "ticket_id": "ticket_id", "number": 1}
return: {}
shopping_cart_del(req)
移除购物车商品
params: {"token": "token", "ticket_id": "ticket_id", "number": 1}
return: {}
shopping_cart_info(req)
读购物车信息
params: {"token": "token"}
return: {"shopping_cart_info": [{"ticket_id": "ticket_id", "ticket_name": "ticket_name", "ticket_image": "image", "ticket_intro": "ticket_intro", "ticket_price": 0, "number": 1, "status": 0, "created_at": ts, "updated_at": ts}, ...]}
sns_block(req)
拉黑
params: {"token": "token", "to_uid": "to_uid"}
return: {}
sns_follow(req)
关注用户
params: {"token": "token", "to_uid": "to_uid"}
return: {}
sns_unblock(req)
取消拉黑
params: {"token": "token", "to_uid": "to_uid"}
return: {}
sns_unfollow(req)
取消关注用户
params: {"token": "token", "to_uid": "to_uid"}
return: {}
ticket_banner(req)
读票儿banner
params: {"token": "token"}
return: {"ticket_banner": [{"banner_id": "banner_id", "image": "image", "url": "url"}, ...]}
ticket_comment_list(req)
读票评论列表（分页）
params: {"token": "token", "ticket_id": "ticket_id", "limit": 100, "offset": 0}
return: {"ticket_comment_list": [{"ticket_comment_id": "ticket_comment_id", "uid": "uid", "content": "content", "created_at": ts}, ...]}
ticket_comment_publish(req)
写票评论
params: {"token": "token", "ticket_id": "ticket_id", "content": "content"}
return: {}
ticket_detail(req)
读票详情 + 100条评论
params: {"token": "token", "ticket_id": "ticket_id"}
return: {"ticket_detail": {"ticket_id": "ticket_id", "name": "name", "image": "image", "intro": "intro", "price": 0, "total": 1, "remain": 1, "created_at": ts, "updated_at": ts}, "ticket_comment_list": [{"ticket_comment_id": "ticket_comment_id", "uid": "uid", "content": "content", "created_at": ts}, ...]
ticket_list(req)
读票列表（分页）(商品，未出售)
params: {"token": "token"}
return: {"ticket_list": [{"ticket_id": "ticket_id", "name": "name", "image": "image", "intro": "intro", "price": 0,"total": 1, "remain": 1, "created_at": ts}, ...]
user_info(req)
读他人信息
params: {"token": "token", "to_uid": "to_uid"}
return: {"user_info": {'uid': '9b2a3757ed174de88b7b3fdc2247dd7b', 'nickname': 'test', 'avatar': 'image', 'gender': 0, 'country': '86', 'province': '广东省', 'city': '深圳市', 'birthday': 1699708371238, 'phone': '18682222222', 'email': 'xxx@163.com', 'category': 0, 'status': 0, 'score': 0, 'invitation_code': None, 'inviter': None, 'intro': 'test_intro', 'created_at': ts}}
user_login(req)
手机号登录 （密码）or（短信验证） (不用登录可用)
params: {"country": "86", "phone": "13800138000", "password": "123456"} or {"country": "86", "phone": "13800138000", "code": "123456"}
return: {"token": "token", "uid": "uid"}
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
return: {"token": "token", "uid": "uid"}

 
Data
      
 
NOT_LOGIN = ['current_time', 'send_sms_code', 'user_signup', 'user_login', 'user_password_update']
