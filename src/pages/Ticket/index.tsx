
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  ImageBackground,
  StatusBar,
  Text,
  Image
} from 'react-native';
import {styles} from './styles'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';

const pageBg = require('@/assets/images/ticket_bgi.png')
const centerBg = require('@/assets/images/ticket_downbg.png')

const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_2.png')
const ticket_pro_ban_2 = require('@/assets/images/ticket_pro_ban_1.png')
const topbanner = require('@/assets/images/ticket_banner.png')
const ticket_line = require('@/assets/images/ticket_line.png')

const ticket_tj = require('@/assets/images/ticket_tj_ic.png')
const ticket_dr = require('@/assets/images/ticket_dr_ic.png')
const ticket_focus = require('@/assets/images/ticket_focus_ic.png')
const ticket_play = require('@/assets/images/ticket_play_ic.png')

const bannerList:any[] = [
  {
    title:'破妄明心',
    des:'·明星阵容',
    banner:ticket_pro_ban_1
  },
  {
    title:'阴阳师',
    des:'·全民集结',
    banner:ticket_pro_ban_2
  }
]

function Ticket(): JSX.Element {
  return (
    <View style={styles.mainView}>
      <ImageBackground style={styles.topbg} source={pageBg}>
        <LinearGradient colors={['transparent', '#000']} style={styles.downOp}/>
      </ImageBackground>
      <ScrollView style={{flex:1}} scrollEventThrottle={16}>
        <View style={styles.contentView}>
          <TopCarousel/>
          <View style={styles.bannerView}>
            <Text style={styles.centerTitle}>来自票友推荐</Text>
            {
              bannerList.map((item:any,index:number)=>{
                return <View key={index + 'banner'}>
                  <Image style={styles.banner} source={item.banner}/>
                  <View style={styles.bannerTitleView}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerTitleDes}>{item.des}</Text>
                  </View>
                </View>
              })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const centerItems:any[] = [
  ticket_tj,
  ticket_dr,
  ticket_focus,
  ticket_play
]
function TopCarousel(){
  const [currentIndex,setCurrentIndex] = useState(0)
  const datas:any[] = [1,2,3,4,5]
  return <View>
            <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>

    <Carousel
      loop
      autoPlay={true}
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH * 640 / 750}
      data={datas}
      scrollAnimationDuration={3000}
      onSnapToItem={(index) => {setCurrentIndex(index)}}
      renderItem={({ item,index }) => (
        <Image style={{width:'100%',height:'100%'}} source={topbanner}/>
      )}
      />
    <View style={styles.pointView}>
      {
        datas.map((item:any,index:number)=>{
          return <View style={[styles.point,{
            backgroundColor:currentIndex == index ? Colors.buttonMain : '#CCCCCC'
          }]}/>
        })
      }
    </View>
    <ImageBackground style={styles.centerbg} source={centerBg}>
      <Image style={styles.centerLine} source={ticket_line}/>
      <View style={styles.centerItemView}>
        {
          centerItems.map((item:any,index:number)=>{
            return <TouchableOpacity key={index+'centeritem'}>
                <Image style={[styles.centerItem,{
                marginTop:(index == 0 || index == 3) ? -10 : 0
              }]} source={item} />
            </TouchableOpacity>
          })
        }
      </View>
    </ImageBackground>
  </View>
}

export default Ticket;
