import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Settings, UserRound } from 'lucide-react-native';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StudentProfileScreen from '../screens/StudentProfileScreen';
import StudentFormScreen from '../screens/StudentFormScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = { headerShadowVisible: false, headerTitleStyle: { fontWeight: '700' }, headerTintColor: '#0F172A', headerStyle: { backgroundColor: '#F8FAFC' } };

function AuthNavigator() {
  return <AuthStack.Navigator screenOptions={screenOptions}><AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /><AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create account' }} /></AuthStack.Navigator>;
}

function HomeNavigator() {
  return <HomeStack.Navigator screenOptions={screenOptions}><HomeStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} /><HomeStack.Screen name="Profile" component={StudentProfileScreen} options={{ title: 'My profile' }} /><HomeStack.Screen name="StudentForm" component={StudentFormScreen} options={({ route }) => ({ title: route.params?.profile ? 'Edit profile' : 'Create profile' })} /></HomeStack.Navigator>;
}

function AppNavigator() {
  return <Tab.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: '#4F46E5', tabBarInactiveTintColor: '#64748B', tabBarStyle: { height: 64, paddingTop: 6 }, tabBarIcon: ({ color, size }) => route.name === 'Home' ? <House color={color} size={size} /> : <Settings color={color} size={size} /> })}><Tab.Screen name="Home" component={HomeNavigator} options={{ title: 'Home' }} /><Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }} /></Tab.Navigator>;
}

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <LoadingSpinner label="Restoring your session..." />;
  return <NavigationContainer>{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
}

