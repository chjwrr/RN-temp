import LoginScreen from '@/pages/LoginAndRegister/Login'
import PhoneLoginScreen from '@/pages/LoginAndRegister/PhoneLogin'
import PhoneCodeScreen from '@/pages/LoginAndRegister/PhoneCode'
import ForgetPsdScreen from '@/pages/LoginAndRegister/ForgetPsd'
import RegisterScreen from '@/pages/LoginAndRegister/Register'
import ChooseSexScreen from '@/pages/LoginAndRegister/ChooseSex'
import ChooseAvatarScreen from '@/pages/LoginAndRegister/ChooseAvatar'
import RecommendDetailScreen from '@/pages/Home/Recommend/RecommendDetail'
import DesignDetailScreen from '@/pages/Home/Design/DesignDetail'
import ShowDetailScreen from '@/pages/Home/Show/ShowDetail'
import TicketBannerDetailScreen from '@/pages/Ticket/BannerDetail'
import TicketBannerDetailListScreen from '@/pages/Ticket/BannerDetailist'
import BuyTicketScreen from '@/pages/Ticket/BuyTicket'
import SuperPersonDetailScreen from '@/pages/Ticket/SuperPerson/SuperPersonDetail'
import EcologyDetailScreen from '@/pages/Ecology/EcologyDetail'
import EditInfoScreen from '@/pages/Mine/EditInfo'
import SettingScreen from '@/pages/Mine/Setting'
import InviteFriendScreen from '@/pages/Mine/InviteFriend'
import MyCollectScreen from '@/pages/Mine/MyCollect'
import MyFocusScreen from '@/pages/Mine/MyFocus'
import MyOrderScreen from '@/pages/Mine/MyOrder'
import MyPostScreen from '@/pages/Mine/MyPost'


export const routers:any[] = [
    {
      name:'Login',
      component:LoginScreen
    },
    {
      name:'PhoneLogin',
      component:PhoneLoginScreen
    },
    {
      name:'PhoneCode',
      component:PhoneCodeScreen
    },
    {
      name:'ForgetPsd',
      component:ForgetPsdScreen
    },
    {
      name:'Register',
      component:RegisterScreen
    },
    {
      name:'ChooseSex',
      component:ChooseSexScreen
    },
    {
      name:'ChooseAvatar',
      component:ChooseAvatarScreen
    },
    {
      name:'RecommendDetail',
      component:RecommendDetailScreen
    },
    {
      name:'DesignDetail',
      component:DesignDetailScreen
    },
    {
      name:'ShowDetail',
      component:ShowDetailScreen
    },
    {
      name:'TicketBannerDetail',
      component:TicketBannerDetailScreen
    },
    {
      name:'TicketBannerDetailList',
      component:TicketBannerDetailListScreen
    },
    {
      name:'BuyTicket',
      component:BuyTicketScreen
    },
    {
      name:'SuperPersonDetail',
      component:SuperPersonDetailScreen
    },
    {
      name:'EcologyDetail',
      component:EcologyDetailScreen
    },
    {
      name:'EditInfo',
      component:EditInfoScreen
    },
    {
      name:'Setting',
      component:SettingScreen
    },
    {
      name:'InviteFriend',
      component:InviteFriendScreen
    },
    {
      name:'MyCollect',
      component:MyCollectScreen
    },
    {
      name:'MyFocus',
      component:MyFocusScreen
    },
    {
      name:'MyOrder',
      component:MyOrderScreen
    },
    {
      name:'MyPost',
      component:MyPostScreen
    },

    

]
