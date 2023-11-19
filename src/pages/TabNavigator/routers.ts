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
    
    
    
]
