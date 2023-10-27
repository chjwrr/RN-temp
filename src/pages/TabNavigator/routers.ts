import LoginScreen from '@/pages/LoginAndRegister/Login'
import PhoneLoginScreen from '@/pages/LoginAndRegister/PhoneLogin'
import PhoneCodeScreen from '@/pages/LoginAndRegister/PhoneCode'
import ForgetPsdScreen from '@/pages/LoginAndRegister/ForgetPsd'
import RegisterScreen from '@/pages/LoginAndRegister/Register'
import ChooseSexScreen from '@/pages/LoginAndRegister/ChooseSex'
import ChooseAvatarScreen from '@/pages/LoginAndRegister/ChooseAvatar'
import RecommendDetailScreen from '@/pages/Home/Recommend/RecommendDetail'


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
]
