//发送短信验证码
export const SEND_SMS_CODE = 'send_sms_code'

//手机号注册 （短信验证）
export const USER_SIGN_UP = 'user_signup'

//手机号登录 （密码/验证码 password/code）
export const USER_LOGIN = 'user_login'

// 重置密码
export const USER_PASSWORD_UPDATE = 'user_password_update'

//用户登出
export const USER_LOGOUT = 'user_logout'

//写个人信息
export const MY_USER_INFO_UPDATE = 'my_user_info_update'

//读个人信息
export const MY_USER_INFO = 'my_user_info'

// 读他人信息(to_uid/phone)
export const USER_INFO = 'user_info'

//发布文章（图片、文字）
export const ARTICLE_PUBLISH = 'article_publish'

//读我的文章列表（分页）
export const MY_ARTICLE_LIST = 'my_article_list'

// 读文章评论列表（分页）
export const ARTICLE_COMMENT_LIST = 'article_comment_list'

//文章评论
export const ARTICLE_COMMENT = 'article_comment'

//读文章详情
export const ARTICLE_DETAIL = 'article_detail'

//删除文章评论
export const ARTICLE_COMMENNT_DEL = 'article_comment_del'

//删除文章
export const ARTICLE_DEL = 'article_del'

//关注用户
export const SNS_FOLLOW = 'sns_follow'

//取消关注用户
export const SNS_UNFOLLOW = 'sns_unfollow'

//拉黑
export const SNS_BLOCK = 'sns_block'

//取消拉黑
export const SNS_UNBLOCK = 'sns_unblock'

//我的关注
export const MY_FOLLOWING = 'my_following'

//我的粉丝
export const MY_FOLLOWER = 'my_follower'

//我的拉黑
export const MY_BLOCK = 'my_block'

//发送私信
export const SEND_MESSAGE = 'send_message'

//读私信列表
export const MY_MESSAGE = 'my_message'

//删除私信
export const MESSAGE_DEL = 'message_del'

//点赞
export const ARTICLE_LIKE = 'article_like'

//取消点赞
export const ARTICLE_UNLIKE = 'article_unlike'

//收藏
export const ARTICLE_COLLECT = 'article_collect'

//取消收藏
export const ARTICLE_UNCOLLECT = 'article_uncollect'

//文章评论
export const ARTICLE_COMMENT_PUBLISH = 'article_comment_publish'

//删除文章评论
export const ARTICLE_COMMENT_DEL = 'article_comment_del'

//获取上传图片id
export const GET_MEDIA_ID = 'get_media_id'

//查询达人列表（分页 limit, offset 可选）
export const GET_MASTER_LIST = 'get_master_list'

//读票列表（分页）(商品，未出售)
export const TICKET_LIST = 'ticket_list'

//读我的票列表（分页）（已购买）
export const MY_TICKET_LIST = 'my_ticket_list'

//读票详情 + 100条评论
export const TICKET_LIST_DETAIL = 'ticket_detail'

//读票评论列表（分页）
export const TICKET_COMMENT_LIST = 'ticket_comment_list'

//写票评论
export const TICKET_COMMENT_PUBLISH = 'ticket_comment_publish'

//读购物车信息
export const SHOPPING_CART_INFO = 'shopping_cart_info'

//添加商品到购物车
export const SHOPPING_CART_ADD = 'shopping_cart_add'

//移除购物车商品
export const SHOPPING_CART_DEL = 'shopping_cart_del'

//我的订单列表（分页）
export const MY_ORDER_LIST = 'my_order_list'

//读订单详情
export const ORDER_DETAIL = 'order_detail'

//创建订单 (直接购买)
export const ORDER_CREATE = 'order_create'

//创建订单（购物车）
export const ORDER_CREATE_BY_SHOPPING_CART = 'order_create_by_shopping_cart'

//取消订单
export const ORDER_CANCEL = 'order_cancel'

//读设计圈服饰列表（分页）
export const DESIGN_CIRCLE_CLOTH_LIST = 'design_circle_cloth_list'

//读设计圈详情 + 100条评论
export const DESIGN_CIRCLE_CLOTH_DETAIL = 'design_circle_cloth_detail'

//读商家服饰列表（分页）
export const MERCHANT_CLOTH_LIST = 'merchant_cloth_list'

//读商家服饰详情
export const MERCHANT_CLOTH_DETAIL = 'merchant_cloth_detail'

//取系统当前时间 (不用登录可用)
export const CURRENNT_TIME = 'current_time'

// 首页推荐
export const RECOMMEND_MERCHANT_CLOTH_LIST = 'recommend_merchant_cloth_list'

// 首页banner
export const HOME_BANNER = 'home_banner'

// 票banner
export const TICKET_BANNER = 'ticket_banner'

// 首页秀场
export const ARTICLE_LIST = 'article_list'

// 首页关注
export const FOLLOWING_ARTICLE_LIST = 'following_article_list'


