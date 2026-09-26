import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { UserPlus } from 'lucide-react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { authService } from '../services/authService';
import { registerSchema } from '../utils/validation';

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: yupResolver(registerSchema), defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' } });
  async function submit(values) { try { await authService.register(values); Toast.show({ type: 'success', text1: 'Account created', text2: 'You can sign in now.' }); navigation.goBack(); } catch (error) { Toast.show({ type: 'error', text1: 'Registration failed', text2: error.message }); } }
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-canvas"><ScrollView className="flex-1" contentContainerClassName="px-6 py-8"><Text className="text-2xl font-bold text-ink">Start your profile</Text><Text className="mb-8 mt-2 text-base text-muted">A few details now, and you can make it yours later.</Text><CustomInput control={control} name="firstName" label="First name" placeholder="John" /><CustomInput control={control} name="lastName" label="Last name" placeholder="Perera" /><CustomInput control={control} name="email" label="Email address" placeholder="you@university.edu" keyboardType="email-address" autoCapitalize="none" /><CustomInput control={control} name="password" label="Password" placeholder="At least 8 characters" secureTextEntry autoCapitalize="none" /><CustomInput control={control} name="confirmPassword" label="Confirm password" placeholder="Repeat your password" secureTextEntry autoCapitalize="none" /><CustomButton title="Create account" onPress={handleSubmit(submit)} loading={isSubmitting} icon={UserPlus} /></ScrollView></KeyboardAvoidingView>;
}

