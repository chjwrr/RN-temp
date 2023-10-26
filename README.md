https://js.design/f/y6BtF8?p=Vc9GVvs4Lp

# 下载
`yarn`
`ios: npx pod-install`

# 运行
`npx react-native run-android`

# android 打包apk
`cd android && ./gradlew assembleRelease`


# 清理缓存
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
npx react-native run-android     npx react-native run-ios




# 输入框动画
react-native-textinput-effects：https://github.com/halilb/react-native-textinput-effects
# 各种权限设置，权限判断
https://github.com/zoontek/react-native-permissions
# 视频压缩
https://github.com/shahen94/react-native-video-processing
# 视频播放
https://github.com/react-native-video/react-native-video
# actionsheet
# 下拉选择
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
# 展示图片显示毛玻璃效果
https://github.com/mrousavy/react-native-blurhash
# 时间选取
# 折叠展开隐藏动画
https://github.com/oblador/react-native-collapsible
# slider
https://github.com/jeanregisser/react-native-slider
# 文件处理
https://github.com/itinance/react-native-fs
# 引导提示
https://github.com/mohebifar/react-native-copilot
# 设备信息
https://github.com/react-native-device-info/react-native-device-info
# 上拉加载下拉刷新
# 文件管理
https://github.com/alpha0010/react-native-file-access
# 通知  极光
https://github.com/jpush/jpush-react-native















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


# toast框
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

# 自定义弹出框
```
import { show, hidden } from '@/components/CoverModal'

中间弹出
show(<View style={{
    width:'80%',
    backgroundColor:'white',
    height:200
  }}>
    <Text>modal</Text>
  </View>)

底部弹出
show(<View style={{
    width:'100%',
    backgroundColor:'white',
    height:200
  }}>
    <Text>modal</Text>
  </View>,{
    position:'bottom'
  })

```
 # 键盘遮挡问题
 react-native-keyboard-controller


# 修改语言
```
  const language = useLanguage()
  const dispatch = useDispatch()
  dispatch(changeLanguage('zh-CN'))
```
# 存取 读取值
```
import AsyncStorage from '@react-native-async-storage/async-storage';

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

# 渐变
```
import LinearGradient from 'react-native-linear-gradient';

<LinearGradient colors={['#0f0', '#00f', '#f00']} >
  <Text>
    Sign in with Facebook
  </Text>
</LinearGradient>
```

# tab view
react-native-pager-view  react-native-tab-view








# 待测试

#加载3D模型
const gltf = useGLTF("https://www.arweave.net/1Qi6CQm7jv35_2eDsqc3SraLaB_ngxdm_m1UVbKF8Us?ext=glb");
https://docs.pmnd.rs/react-three-fiber/getting-started/installation#react-native
https://zhuanlan.zhihu.com/p/615965916
https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
3D模型库
https://www.cgtrader.com/items/1872992/download-page






微信支付原生文档
https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html



支持微信登录、支付
https://github.com/bashen1/react-native-mwechat






支付宝原生文档
https://opendocs.alipay.com/open/01bxlm

支持支付宝登录、支付
https://github.com/react-native-hero/alipay





支持微信 支付宝支付
https://github.com/yorkzero831/react-native-super-pay








# TODO 
## 1.登录等输入框，点击输入框的时候，可以动画向上渐变出一个标题
