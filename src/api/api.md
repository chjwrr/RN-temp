import requests
import time
import hashlib

APP_NAME = "yuanyi-app"
APP_SECRET = "3b57ff81-27ea-45d9-a2e3-6e24920b17ac"
API_VESSION = "1"
API_URL = "http://127.0.0.1:8000/yuanyiapi/"
# API_URL = "http://119.45.143.198/yuanyiapi/"
UPLOAD_URL = "http://127.0.0.1:8000/yuanyiapi/upload"


def signature(key, data):
    data_list = ["%s=%s" % (k, v) for k, v in data.items()]
    data_list.sort()
    data_str = "%s&%s" % ("&".join(data_list), key)

    hash = hashlib.sha256()
    hash.update(data_str.encode('utf-8'))
    return hash.hexdigest()


class Agent:
    def __init__(self, phone):
        self.data = {
            'country': '86',
            'phone': phone,
            'password': "123456",
            'nickname': 'nick-%s' % phone,
        }
        self.num = 0  # api请求次数

    def api(self, req):
        req['ver'] = API_VESSION
        req['ts'] = int(time.time() * 1000)
        req['app'] = APP_NAME
        if 'token' in self.data:
            req['token'] = self.data['token']
        req['sig'] = signature(APP_SECRET, req)

        print("//参数: ")
        print(req)
        # print("//--------------------%d" % self.num)
        # self.num += 1

        res = requests.post(url=API_URL, json=req)
        assert res.ok
        res_data = res.json()

        print("//返回数据: ")
        print(res_data)
        print("//-----------------------------------------")

        assert res_data['code'] == 0
        self.data.update(res_data)
        return res_data
    
    def upload(self, media_id, file_name):
        files = {'file': open(file_name, 'rb')}
        data = {'media_id': media_id}
        res = requests.post(url=UPLOAD_URL, files=files, data=data)
        print(res)

    # 注册登录
    # 发送短信验证码
    def send_sms_code(self):
        print("//发送短信验证码, send_sms_code")
        self.api({"method": "send_sms_code",
                        "country": self.data['country'], "phone": self.data['phone']})
        

    # 手机号注册 （短信验证）
    def user_signup(self):
        print("//手机号注册 （短信验证）, user_signup")
        self.api({"method": "user_signup", "country": self.data['country'], "phone": self.data['phone'],
                        "nickname": self.data['nickname'], 'password': self.data['password'], "code": '123456'})
        

    # 手机号登录 （密码）
    def user_login(self):
        print("//手机号登录 （密码）, user_login")
        self.api({"method": "user_login",
                       "country": self.data['country'], "phone": self.data['phone'], 'password': self.data['password']})
        
    
    # 手机号登录（短信验证）
    def user_login_sms(self):
        print("//手机号登录（短信验证）, user_login")
        self.api({"method": "user_login",
                       "country": self.data['country'], "phone": self.data['phone'], "code": '123456'})
        

    # 用户登出
    def user_logout(self):
        print("//用户登出, user_logout")
        self.api({"method": "user_logout"})
        self.data.pop('token')
        

    # 重置密码 （短信验证）
    def user_password_update(self):
        print("//重置密码 （短信验证）, user_password_update")
        new_password = "123456"
        self.api({"method": "user_password_update",
                        "country": self.data['country'], "phone": self.data['phone'], 'password': new_password, "code": '1234'})
        self.data['password'] = new_password
        

    # 用户个人信息---------------------------------------------------
    # 读个人信息
    def my_user_info(self):
        print("//读个人信息, my_user_info")
        self.api({"method": "my_user_info"})
        

    # 读他人信息(uid)
    def user_info(self, to_uid):
        print("//读他人信息(uid), user_info")
        self.api({"method": "user_info", "to_uid": to_uid})

    # 读他人信息(phone)
    def user_info_by_phone(self, phone):
        print("//读他人信息(phone), user_info")
        self.api({"method": "user_info", "phone": phone}) 

    # 写个人信息
    def my_user_info_update(self):
        print("//写个人信息, my_user_info_update")
        self.api({"method": "my_user_info_update", 
                        "nickname": "test",
                        "avatar": "image_id",
                        'gender': 1,
                        'province': "广东省",
                        'city': "深圳市",
                        'birthday': int(time.time() * 1000),
                        'email': "xxx@163.com",
                        'intro': "test_intro"
                        })
        
    # 查询达人列表（分页 limit, offset 可选）
    def get_master_list(self):
        print("//查询达人列表（分页）, get_master_list")
        self.api({"method": "get_master_list", "limit": 10, "offset": 0})

    # 社交系统
    # 用户关系------------------------------------------------------
    # 我的关注
    def my_following(self):
        print("//我的关注, my_following")
        self.api({"method": "my_following"})
        

    # 我的粉丝
    def my_follower(self):
        print("//我的粉丝, my_follower")
        self.api({"method": "my_follower"})
        

    # 我的拉黑
    def my_block(self):
        print("//我的拉黑, my_block")
        self.api({"method": "my_block"})
        

    # 关注用户
    def sns_follow(self, to_uid):
        print("//关注用户, sns_follow")
        self.api({"method": "sns_follow", "to_uid": to_uid})
        
        
    # 取消关注用户
    def sns_unfollow(self, to_uid):
        print("//取消关注用户, sns_unfollow")
        self.api({"method": "sns_unfollow", "to_uid": to_uid})
        
        
    # 拉黑
    def sns_block(self, to_uid):
        print("//拉黑, sns_block")
        self.api({"method": "sns_block", "to_uid": to_uid})
             

    # 取消拉黑
    def sns_unblock(self, to_uid):
        print("//取消拉黑, sns_unblock")
        self.api({"method": "sns_unblock", "to_uid": to_uid})
        

    # 私信
    # 发送私信
    def send_message(self, to_uid, content):
        print("//发送私信, send_message")
        self.api({"method": "send_message", "to_uid": to_uid, "content": content})
        
    # 读私信列表
    def my_message(self):
        print("//读私信列表, my_message")
        self.api({"method": "my_message"})
        
    # 删除私信
    def message_del(self, message_id_list):
        print("//删除私信, message_del")
        self.api({"method": "message_del", "message_id_list": message_id_list})
        

    # 文章（笔记）
    # 发布文章（图片、文字）
    def article_publish(self, content):
        print("//发布文章（图片、文字）, article_publish")
        self.api({"method": "article_publish", "content": content})
        

    # 读我关注的人的文章列表（分页 limit, offset 可选）
    def following_article_list(self):
        print("//读我关注的人的文章列表（分页）, following_article_list")
        self.api({"method": "following_article_list", "limit": 10, "offset": 0})
        

    # 读我的文章列表（分页 limit, offset 可选）
    def my_article_list(self):
        print("//读我的文章列表（分页）, my_article_list")
        self.api({"method": "my_article_list", "limit": 10, "offset": 0})
        

    # 读文章详情
    def article_detail(self, article_id):
        print("//读文章详情, article_detail")
        self.api({"method": "article_detail", "article_id": article_id})
        

    # 删除文章
    def article_del(self, article_id_list):
        print("//删除文章, article_del")
        self.api({"method": "article_del", "article_id_list": article_id_list})
        

    # 点赞
    def article_like(self, article_id):
        print("//点赞, article_like")
        self.api({"method": "article_like", "article_id": article_id})
        

    # 取消点赞
    def article_unlike(self, article_id):
        print("//取消点赞, article_unlike")
        self.api({"method": "article_unlike", "article_id": article_id})
        

    # 收藏
    def article_collect(self, article_id):
        print("//收藏, article_collect")
        self.api({"method": "article_collect", "article_id": article_id})
        

    # 取消收藏
    def article_uncollect(self, article_id):
        print("//取消收藏, article_uncollect")
        self.api({"method": "article_uncollect", "article_id": article_id})
          

    # 文章评论
    def article_comment_publish(self, article_id, content):
        print("//文章评论, article_comment_publish")
        self.api({"method": "article_comment_publish", "article_id": article_id, "content": content})
        

    # 删除文章评论
    def article_comment_del(self, article_comment_id_list):
        print("//删除文章评论, article_comment_del")
        self.api({"method": "article_comment_del", "article_comment_id_list": article_comment_id_list})


    # 获取媒体文件上传ID
    def get_media_id(self):
        print("//获取媒体文件上传ID, get_media_id")
        self.api({"method": "get_media_id"})

    # 查询达人列表（分页）
    def get_master_list(self):
        print("//查询达人列表（分页）, get_master_list")
        self.api({"method": "get_master_list", "limit": 10, "offset": 0})

    ## 电商系统
    ### 商品（票儿）## 系统
    # 读票列表（分页）(商品，未出售)
    def ticket_list(self):
        print("//读票列表（分页）(商品，未出售), ticket_list")
        self.api({"method": "ticket_list", "limit": 10, "offset": 0})

    # 读我的票列表（分页）（已购买）
    def my_ticket_list(self):
        print("//读我的票列表（分页）（已购买）, my_ticket_list")
        self.api({"method": "my_ticket_list", "limit": 10, "offset": 0})

    # 读票详情 + 100条评论
    def ticket_detail(self):
        print("//读票详情 + 100条评论, ticket_detail")
        self.api({"method": "ticket_detail", "ticket_id": 1})

    # 读票评论列表（分页）
    def ticket_comment_list(self):
        print("//读票评论列表（分页）, ticket_comment_list")
        self.api({"method": "ticket_comment_list", "ticket_id": 1, "limit": 10, "offset": 0})
        
    # 写票评论
    def ticket_comment_publish(self):
        print("//写票评论, ticket_comment_publish")
        self.api({"method": "ticket_comment_publish", "ticket_id": 1, "content": "test"})

    ### 购物车
    # 读购物车信息
    def shopping_cart_info(self):
        print("//读购物车信息, shopping_cart_info")
        self.api({"method": "shopping_cart_info"})

    # 添加商品到购物车
    def shopping_cart_add(self):
        print("//添加商品到购物车, shopping_cart_add")
        self.api({"method": "shopping_cart_add", "ticket_id": 1, "number": 1})

    # 移除购物车商品
    def shopping_cart_del(self):
        print("//移除购物车商品, shopping_cart_del")
        self.api({"method": "shopping_cart_del", "ticket_id": 1, "number": 1})

    ### 订单
    # 我的订单列表（分页）
    def my_order_list(self):
        print("//我的订单列表（分页）, my_order_list")
        self.api({"method": "my_order_list", "limit": 10, "offset": 0})

    # 读订单详情
    def order_detail(self):
        print("//读订单详情, order_detail")
        self.api({"method": "order_detail", "order_id": 1})

    # 创建订单 (直接购买)
    def order_create(self):
        print("//创建订单, order_create")
        self.api({"method": "order_create", "ticket_id_list": [1], "number": [1]})

    # 创建订单（购物车）
    def order_create_by_shopping_cart(self):
        print("//创建订单（购物车）, order_create_by_shopping_cart")
        self.api({"method": "order_create_by_shopping_cart", "ticket_id_list": [1, 2, 3]})

    # 取消订单
    def order_cancel(self):
        print("//取消订单, order_cancel")
        self.api({"method": "order_cancel", "order_id": 1})

    ### 支付
    # 支付宝支付
    # 微信支付
    # 银联支付

    ### 设计圈（图片，文字，3D模型）## 系统
    # 读设计圈服饰列表（分页）
    def design_circle_cloth_list(self):
        print("//读设计圈服饰列表（分页）, design_circle_cloth_list")
        self.api({"method": "design_circle_cloth_list", "limit": 10, "offset": 0})

    # 读设计圈详情 + 100条评论
    def design_circle_cloth_detail(self):
        print("//读设计圈详情 + 100条评论, design_circle_cloth_detail")
        self.api({"method": "design_circle_cloth_detail", "cloth_id": 1})

    # 读商家服饰列表（分页）
    def merchant_cloth_list(self):
        print("//读商家服饰列表（分页）, merchant_cloth_list")
        self.api({"method": "merchant_cloth_list", "limit": 10, "offset": 0})

    # 读商家服饰详情
    def merchant_cloth_detail(self):
        print("//读商家服饰详情, merchant_cloth_detail")
        self.api({"method": "merchant_cloth_detail", "cloth_id": 1})
        

    def run(self):
        self.send_sms_code()
        self.user_signup()
        self.user_login()

        # 个人信息
        self.my_user_info_update()
        self.my_user_info()

        # 发布文章
        for i in range(10):
            self.article_publish("qwertyuiopasdfghjklzxcvbnnm-%d" % i)

        # 我的文章列表
        self.my_article_list()

        # 我关注的人的文章列表
        self.following_article_list()

        # 发评论
        for article in self.data['my_article_list']:
            self.article_comment_publish(article["article_id"], "comment-00000")

        # 删评论 只能删自己的评论
        article_id = self.data['my_article_list'][0]["article_id"]
        self.article_detail(article_id)
        my_comment_id_list = [comment['comment_id'] for comment in self.data['article_detail']['comment_list'] if comment['uid'] == self.data['uid']]
        self.article_comment_del(my_comment_id_list[:3])

        # 删文章
        article_id_list = [article['article_id'] for article in self.data['my_article_list']]
        self.article_del(article_id_list[:3])


def main():
    a = Agent("18682222222")
    a.run()

    b = Agent("18683333333")
    b.run()

    c = Agent("18684444444")
    c.run()

    d = Agent("18685555555")
    d.run()

    a.sns_follow(b.data['uid'])
    a.sns_follow(c.data['uid'])
    a.sns_block(d.data['uid'])
    a.sns_unblock(d.data['uid'])
    a.sns_unfollow(c.data['uid'])

    b.sns_follow(a.data['uid'])

    a.my_following()
    a.my_follower()
    a.my_block()

    a.send_message(b.data['uid'], "hello")
    a.send_message(c.data['uid'], "hello")
    a.my_message()
    a.message_del([a.data['my_message'][0]['message_id']])

def test0():
    a = Agent("18682222222")
    a.user_login()
    a.get_media_id()
    a.upload(a.data["media_id"], "88.jpeg")

if __name__ == '__main__':
    main()
