const assert = require("assert");
const crypto = require("crypto");
const fetch = require("node-fetch");

APP_NAME = "yuanyi-app";
APP_SECRET = "3b57ff81-27ea-45d9-a2e3-6e24920b17ac";
API_VESSION = "1";
API_URL = "http://127.0.0.1:8000/yuanyiapi/";
// API_URL = "http://119.45.143.198/yuanyiapi/";

function signature(key, data) {
    const dataList = Object.entries(data).map(([k, v]) => `${k}=${v}`);
    dataList.sort();
    const dataStr = dataList.join('&') + '&' + key;
  
    const hash = crypto.createHash('sha256');
    hash.update(dataStr);
    return hash.digest('hex');
  }

class Agent {
    constructor(phone) {
      this.data = {
        country: '86',
        phone: phone,
        password: '123456',
        nickname: `nick-${phone}`,
      };
      this.num = 0; // api请求次数
    }
  
    async api(req) {
      req.ver = API_VESSION;
      req.ts = Math.floor(Date.now() / 1000);
      req.app = APP_NAME;
      if ('token' in this.data) {
        req.token = this.data.token;
      }
      req.sig = signature(APP_SECRET, req);
  
      console.log('//参数: ');
      console.log(req);
      // console.log('//--------------------%d', this.num);
      // this.num += 1;
  
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
  
      assert(res.ok);
      const resData = await res.json();
  
      console.log('//返回数据: ');
      console.log(resData);
      console.log('//-----------------------------------------');
  
      assert(resData.code === 0);
      this.data.update(resData);
      return resData;
    }

    send_sms_code() {
        console.log("//发送验证码, send_sms_code");
        this.api({ method: "send_sms_code", phone: this.phone });
    }

    user_signup() {
        console.log("//用户注册, user_signup");
        this.api({
            method: "user_signup",
            phone: this.phone,
            sms_code: this.data["sms_code"],
            password: "123456",
            nickname: "test_nickname",
            intro: "test_intro",
        });
    }

    user_login() {
        console.log("//用户登录, user_login");
        this.api({
            method: "user_login",
            phone: this.phone,
            password: "123456",
        });
    }

    my_user_info_update() {
        console.log("//更新个人信息, my_user_info_update");
        this.api({
            method: "my_user_info_update",
            nickname: "test_nickname_update",
            intro: "test_intro_update",
        });
    }

    my_user_info() {
        console.log("//读个人信息, my_user_info");
        this.api({ method: "my_user_info" });
    }

    // 社交系统
    // 用户关系------------------------------------------------------
    // 我的关注
    my_following() {
        console.log("//我的关注, my_following");
        this.api({ method: "my_following" });
    }

    // 我的粉丝
    my_follower() {
        console.log("//我的粉丝, my_follower");
        this.api({ method: "my_follower" });
    }

    // 我的拉黑
    my_block() {
        console.log("//我的拉黑, my_block");
        this.api({ method: "my_block" });
    }

    // 关注用户
    sns_follow(to_uid) {
        console.log("//关注用户, sns_follow");
        this.api({ method: "sns_follow", to_uid: to_uid });
    }

    // 取消关注用户
    sns_unfollow(to_uid) {
        console.log("//取消关注用户, sns_unfollow");
        this.api({ method: "sns_unfollow", to_uid: to_uid });
    }

    // 拉黑
    sns_block(to_uid) {
        console.log("//拉黑, sns_block");
        this.api({ method: "sns_block", to_uid: to_uid });
    }

    // 取消拉黑
    sns_unblock(to_uid) {
        console.log("//取消拉黑, sns_unblock");
        this.api({ method: "sns_unblock", to_uid: to_uid });
    }

    // 私信
    // 发送私信
    send_message(to_uid, content) {
        console.log("//发送私信, send_message");
        this.api({ method: "send_message", to_uid: to_uid, content: content });
    }

    // 读私信列表
    my_message() {
        console.log("//读私信列表, my_message");
        this.api({ method: "my_message" });
    }

    // 删除私信
    message_del(message_id_list) {
        console.log("//删除私信, message_del");
        this.api({ method: "message_del", message_id_list: message_id_list });
    }

    // 文章（笔记）
    // 发布文章（图片、文字）
    article_publish(content) {
        console.log("//发布文章（图片、文字）, article_publish");
        this.api({ method: "article_publish", content: content });
    }

    // 读我关注的人的文章列表（分页）
    following_article_list() {
        console.log("//读我关注的人的文章列表（分页）, following_article_list");
        this.api({ method: "following_article_list" });
    }

    // 读我的文章列表（分页）
    my_article_list() {
        console.log("//读我的文章列表（分页）, my_article_list");
        this.api({ method: "my_article_list" });
    }

    // 读文章详情
    article_detail(article_id) {
        console.log("//读文章详情, article_detail");
        this.api({ method: "article_detail", article_id: article_id });
    }

    // 删除文章
    article_del(article_id_list) {
        console.log("//删除文章, article_del");
        this.api({ method: "article_del", article_id_list: article_id_list });
    }

    // 点赞
    article_like(article_id) {
        console.log("//点赞, article_like");
        this.api({ method: "article_like", article_id: article_id });
    }

    // 取消点赞
    article_unlike(article_id) {
        console.log("//取消点赞, article_unlike");
        this.api({ method: "article_unlike", article_id: article_id });
    }

    // 收藏
    article_collect(article_id) {
        console.log("//收藏, article_collect");
        this.api({ method: "article_collect", article_id: article_id });
    }

    // 取消收藏
    article_uncollect(article_id) {
        console.log("//取消收藏, article_uncollect");
        this.api({ method: "article_uncollect", article_id: article_id });
    }

    // 文章评论
    article_comment(article_id, content) {
        console.log("//文章评论, article_comment");
        this.api({
            method: "article_comment",
            article_id: article_id,
            content: content,
        });
    }

    // 删除文章评论
    article_comment_del(article_comment_id_list) {
        console.log("//删除文章评论, article_comment_del");
        this.api({
            method: "article_comment_del",
            article_comment_id_list: article_comment_id_list,
        });
    }

    run() {
        this.send_sms_code();
        this.user_signup();
        this.user_login();

        // 个人信息
        this.my_user_info_update();
        this.my_user_info();

        // 发布文章
        for (let i = 0; i < 10; i++) {
            this.article_publish(`qwertyuiopasdfghjklzxcvbnnm-${i}`);
        }

        // 我的文章列表
        this.my_article_list();

        // 我关注的人的文章列表
        this.following_article_list();

        // 发评论
        for (let article of this.data["my_article_list"]) {
            this.article_comment(article["article_id"], "comment-00000");
        }

        // 删评论 只能删自己的评论
        let article_id = this.data["my_article_list"][0]["article_id"];
        this.article_detail(article_id);
        let my_comment_id_list = this.data["article_detail"]["comment_list"]
            .filter((comment) => comment["uid"] === this.data["uid"])
            .map((comment) => comment["comment_id"])
            .slice(0, 3);
        this.article_comment_del(my_comment_id_list.toString());

        // 删文章
        let article_id_list = this.data["my_article_list"]
            .map((article) => article["article_id"])
            .slice(0, 3);
        this.article_del(article_id_list.toString());
    }
}

function main() {
    let a = new Agent("18682222222");
    // a.run();
    a.send_sms_code();

    // let b = new Agent("18683333333");
    // b.run();

    // let c = new Agent("18684444444");
    // c.run();

    // let d = new Agent("18685555555");
    // d.run();

    // a.sns_follow(b.data["uid"]);
    // a.sns_follow(c.data["uid"]);
    // a.sns_block(d.data["uid"]);
    // a.sns_unblock(d.data["uid"]);
    // a.sns_unfollow(c.data["uid"]);

    // b.sns_follow(a.data["uid"]);

    // a.my_following();
    // a.my_follower();
    // a.my_block();

    // a.send_message(b.data["uid"], "hello");
    // a.send_message(c.data["uid"], "hello");
    // a.my_message();
    // a.message_del([a.data["my_message"][0]["message_id"]].toString());
}


main();

