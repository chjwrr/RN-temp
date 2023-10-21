https://js.design/f/y6BtF8?p=Vc9GVvs4Lp

# 启动屏
react-native-splash-screen ：https://github.com/crazycodeboy/react-native-splash-screen
# 输入框动画
react-native-textinput-effects：https://github.com/halilb/react-native-textinput-effects
# 加载中动画
react-native-spinkit：https://github.com/maxs15/react-native-spinkit
# 各种权限设置，权限判断
https://github.com/zoontek/react-native-permissions
# 视频压缩
https://github.com/shahen94/react-native-video-processing
# 视频播放
https://github.com/react-native-video/react-native-video
# 滑动选项卡 代码太老报错
https://github.com/ptomasroos/react-native-scrollable-tab-view
# 下拉放大图片
https://github.com/lelandrichardson/react-native-parallax-view
# 弹出视图
https://github.com/instea/react-native-popup-menu
# actionsheet 代码太老
https://github.com/beefe/react-native-actionsheet
# 下拉选择  代码太老
https://github.com/alinz/react-native-dropdown
# 图片放大方法 代码太老
https://github.com/oblador/react-native-lightbox
# modal  代码太老
https://github.com/maxs15/react-native-modalbox
https://github.com/magicismight/react-native-root-modal
# 毛玻璃
https://github.com/Kureev/react-native-blur
# 音频
https://github.com/zmxv/react-native-sound
# SVG 安装版本有问题
https://github.com/software-mansion/react-native-svg
# 进度条  安装svg 有问题
https://github.com/oblador/react-native-progress
# 左滑删除
https://github.com/dancormier/react-native-swipeout
# 引导页 代码太老
https://github.com/FuYaoDe/react-native-app-intro
# 展示图片显示毛玻璃效果
https://github.com/mrousavy/react-native-blurhash
# 列表优化
https://github.com/Flipkart/recyclerlistview
# 时间选取 代码太老
https://github.com/xgfe/react-native-datepicker
# 折叠展开隐藏动画
https://github.com/oblador/react-native-collapsible
# 弹出对话框 代码太老
https://github.com/jacklam718/react-native-modals
# slider
https://github.com/jeanregisser/react-native-slider
# 占位符 代码太老
https://github.com/tomzaku/react-native-shimmer-placeholder
# 文件处理
https://github.com/itinance/react-native-fs
# 引导提示
react-native-tooltip
# 设备信息
https://github.com/react-native-device-info/react-native-device-info















# loading 列表没有加载出来显示loaidng
https://github.com/hasretozkan/react-native-fade-loading
```
import { FadeLoading } from 'react-native-fade-loading';

<FadeLoading
  style={{
    width:'100%',
    height:20,
    marginVertical:5
  }}
  children={''}
  primaryColor={''}
  secondaryColor={''}
  duration={0}
  visible={false}
  animated={false}
/>

<FadeLoading
  style={{
    width:40,
    height:40,
    marginVertical:5
  }}
  children={''}
  primaryColor={'red'}
  secondaryColor={'blue'}
  duration={0}
  visible={false}
  animated={false}
/>
```


# loading框
https://github.com/magicismight/react-native-root-toast
```
import Toast from 'react-native-root-toast';
Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});
```


# 动画
https://github.com/oblador/react-native-animatable

```
import * as Animatable from 'react-native-animatable';
<Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text>

```

# 选择图片
react-native-image-picker：https://github.com/react-native-image-picker/react-native-image-picker
```
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

launchImageLibrary({mediaType:'photo'}, (response:any) => {
console.log('Response = ', response);
if (response.didCancel) {
    console.log('User cancelled image picker');
} else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
} else if (response.customButton) {
    Alert.alert('自定义按钮:' + response.customButton)
} else {
    const source = { uri: response.uri };
    Alert.alert(JSON.stringify(source))
    console.log("source:" + JSON.stringify(source))
}
});

选择相机
android 需要请求权限
try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
        }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        launchCamera({mediaType:'photo'},(response:any) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            Alert.alert('自定义按钮:' + response.customButton)
        } else {
            const source = { uri: response.uri };
            Alert.alert(JSON.stringify(source))
            console.log("source:" + JSON.stringify(source))
        }
        })
    } else {
        console.log("Camera permission denied");
    }
    } catch (err) {
    console.warn(err);
    }

```


# 图片轮播
react-native-reanimated-carousel

```
import Carousel from 'react-native-reanimated-carousel';

const Image_1 = require('../../assets/images/nft_big_1.png')
const Image_2 = require('../../assets/images/nft_big_2.png')
const Image_3 = require('../../assets/images/nft_big_3.png')
const Image_4 = require('../../assets/images/nft_big_4.png')
const Image_5 = require('../../assets/images/nft_big_5.png')
<Carousel
loop
width={200}
height={284}
autoPlay={true}
data={[
    Image_1,
    Image_2,
    Image_3,
    Image_4,
    Image_5
    
]}
scrollAnimationDuration={1000}
onSnapToItem={(index) => console.log('current index:', index)}
renderItem={({ item,index }) => (
    <View>
    <Image style={{
    width:200,
    height:284
    }} source={item} resizeMode='cover'/>
</View>
)}
/>

```

# 分享
react-native-share：https://react-native-share.github.io/react-native-share/docs/install

```
import Share from 'react-native-share';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});

Share.open(options);

```




# 顶部提示框
https://github.com/lucasferreira/react-native-flash-message#readme

```
import FlashMessage,{ showMessage, hideMessage } from "react-native-flash-message";

showMessage({
message: "Hello World",
description: "This is our second message",
type: "success",
});


放到程序入口最下方
<FlashMessage position="top" />

```




# 富文本
https://github.com/obipawan/react-native-hyperlink
```
import Hyperlink from 'react-native-hyperlink'

 <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } } onPress={(e:any)=>{
          Alert.alert(e)
        }}>
    <Text style={ { fontSize: 15 } }>
      Make clickable strings like https://github.com/obipawan/hyperlink stylable
    </Text>
  </Hyperlink>

```

# 本地存储
https://react-native-async-storage.github.io/async-storage/docs/install/
每个条目受到 WindowCursor 大小的限制，WindowCursor 是用于从 SQLite 读取数据的缓冲区。目前它的大小约为 2 MB
```
try {
    await AsyncStorage.setItem('my-key', '12');
} catch (e) {
// saving error
}

try {
    const value = await AsyncStorage.getItem('my-key');
    console.log('value====',value)
    if (value !== null) {
    // value previously stored
    }
} catch (e) {
    // error reading value
}
```
# 上拉加载下拉刷新
https://github.com/greatbsky/react-native-pull/wiki

lottie-react-native  +  react-native-pull  +  https://airbnb.io/lottie/#/


# 运行
`npx react-native run-android`

# android 打包apk
`cd android && ./gradlew assembleRelease`


# 清理缓存
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
npx react-native run-android     npx react-native run-ios


# LayoutAnimation   Animated


# 防抖  节流
lodash

# redux
https://redux.js.org/introduction/installation


# 网络请求
axios 


# 监听键盘
```
  useEffect(()=>{

    const keyboardDidShow = Keyboard.addListener('keyboardDidShow',(e:any)=>{
      console.log('-e-',e)

      if (Platform.OS == 'ios'){
        console.log('--',e.startCoordinates.height)
        // setInputBottom(e.startCoordinates.height)
      }else {
        console.log('--',e.endCoordinates.height)
        // setInputBottom(0)
      }
    })
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide',()=>{
      
    })

    return ()=>{
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  },[])
```

# 文件管理
https://github.com/alpha0010/react-native-file-access


# 图片缓存
https://github.com/georstat/react-native-image-cache
```

<CachedImage
  source={prefetchImage}
  style={{ height: 200, width: 200 }}
  blurRadius={30} thumbnailSource的blur度
  loadingImageComponent={ImagePlaceholder}  加载中的动画组件
  thumbnailSource='https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500' 加载中显示的图片
  />


预加载图片
useEffect(() => {
    CacheManager.prefetch(prefetchImage);
    CacheManager.prefetch([prefetchImageTwo, prefetchImageThree]);
  }, []);

```

# 瀑布流布局
https://github.com/axerjs/react-native-waterfall-flow/tree/main
```
//@ts-nocheck  加在文件顶部


import WaterfallFlow from 'react-native-waterfall-flow'


 <WaterfallFlow
        data={[1,2,3,4,5,6,7]}
        numColumns={2}
        renderItem={({ item, index, columnIndex })=>{
          return <View style={{
            height:item * 20,
            margin:20,
            backgroundColor:'#0f0',
          }}>
            <Text>title: {item}</Text>
            <Text>index: {index}</Text>
          </View>
        }}
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: '#f9f9f9' }}
        ListHeaderComponent={<View />}
        ListFooterComponent={<View/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        />

```

# 加载 lottie json  动画
lottie-react-native
https://github.com/lottie-react-native/lottie-react-native#lottie-react-native
```
import LottieView from "lottie-react-native";
<LottieView style={{width:100,height:100}} source={require("../path/to/animation.json")} autoPlay loop />


```


#加载3D模型
  const gltf = useGLTF("https://www.arweave.net/1Qi6CQm7jv35_2eDsqc3SraLaB_ngxdm_m1UVbKF8Us?ext=glb");

https://docs.pmnd.rs/react-three-fiber/getting-started/installation#react-native


https://zhuanlan.zhihu.com/p/615965916



https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

微信登录
https://github.com/bashen1/react-native-mwechat
支付宝支付
https://github.com/452MJ/react-native-alipay-jerry
支付宝登录 支付
https://github.com/react-native-hero/alipay
微信支付宝 支付
https://github.com/yorkzero831/react-native-super-pay
3.QQ 微博 微信 登录
https://github.com/xiaoxinbo118/react-native-sns-share
10.通知
https://github.com/jpush/jpush-react-native/tree/dev
修改应用名称
下载





https://doc.talkingdata.com/posts/848#IMPORT%20%26amp%3B%20%20%E5%BC%95%E7%94%A8
https://github.com/yorkzero831/react-native-super-pay




3D模型库
https://www.cgtrader.com/items/1872992/download-page






https://github.com/KamranKhankhail/react-native-rive-splash-screen
expo-splash-screen


# TODO 
## 1.登录等输入框，点击输入框的时候，可以动画向上渐变出一个标题