import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ArrowRight, GraduationCap } from 'lucide-react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import useAuth from '../hooks/useAuth';
import { loginSchema } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: yupResolver(loginSchema), defaultValues: { email: '', password: '' } });
  async function submit(values) { try { await login(values); Toast.show({ type: 'success', text1: 'Welcome back' }); } catch (error) { Toast.show({ type: 'error', text1: 'Sign in failed', text2: error.message }); } }
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-canvas"><View className="flex-1 justify-center px-6"><View className="mb-10"><View className="mb-6 h-14 w-14 items-center justify-center rounded-2xl bg-brand"><GraduationCap color="#fff" size={29} /></View><Text className="text-3xl font-bold text-ink">Your campus, in one profile.</Text><Text className="mt-3 text-base leading-6 text-muted">Sign in to shape and manage the student profile that follows your journey.</Text></View><CustomInput control={control} name="email" label="Email address" placeholder="you@university.edu" keyboardType="email-address" autoCapitalize="none" /><CustomInput control={control} name="password" label="Password" placeholder="Enter your password" secureTextEntry autoCapitalize="none" /><CustomButton title="Sign in" onPress={handleSubmit(submit)} loading={isSubmitting} icon={ArrowRight} /><View className="mt-7 flex-row justify-center"><Text className="text-sm text-muted">New here? </Text><Pressable onPress={() => navigation.navigate('Register')}><Text className="text-sm font-semibold text-brand">Create an account</Text></Pressable></View></View></KeyboardAvoidingView>;
}

