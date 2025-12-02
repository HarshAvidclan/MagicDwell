// src/Screens/Guest/LoginScreen/LoginScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp, Routes } from '../../../Types/Navigation';
import { useAuthStore } from '../../../Stores/AuthStore';
import { API } from '../../../Services/API/Api';
import { Auth } from '../../../Services/API/URL/URLS';
import { AuthService } from '../../../Services/API/AuthService';
import { LoginInput } from '../../../Services/API/Input/inputIndex';
import { LoginResult } from '../../../Services/API/Result/ResultIndex';
import { Colors, Logos, Scale, Strings } from '../../Constants';
import { CommonButton, CommonInput, CommonText } from '../../Common';

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { FetchCurrentUser } = useAuthStore();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!isPhoneValid) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid 10-digit phone number',
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log('Login attempt with phone:', phoneNumber);

      // Prepare login input
      const loginInput: LoginInput = {
        MobileNo: phoneNumber,
      };

      console.log('Login API Request:', loginInput);

      // Call Login API using your existing API manager
      const result = await API.POST_FULL<LoginResult>(Auth.LOGIN, loginInput);

      console.log('Login API Response:', result);

      // Check if account exists
      if (result.Data.IsAccountExist) {
        // Account exists - Save token and authenticate
        console.log('Account exists - Login successful');
        console.log('User Role:', result.Data.Role);
        console.log('User Name:', result.Data.Name);

        // Save access token to AsyncStorage
        if (result.Data.AccessToken) {
          await AuthService.setToken(result.Data.AccessToken);
          console.log('Token saved successfully');
        }

        // Fetch current user details to update auth store
        await FetchCurrentUser();

        console.log(
          'Navigation will be handled by RootNavigator based on role',
        );

        // Note: Navigation is automatic via RootNavigator when isAuthenticated becomes true
      } else {
        // Account doesn't exist - Navigate to signup
        console.log('Account not found - Redirecting to signup');

        setIsLoading(false);

        Alert.alert(
          'Account Not Found',
          'This phone number is not registered. Please create an account.',
          [
            {
              text: 'Sign Up',
              onPress: () => {
                navigation.navigate(Routes.ACCOUNT_DETAILS, {
                  phoneNumber,
                  isNewAccount: true,
                });
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);

      setIsLoading(false);

      // Show error alert to user
      Alert.alert(
        'Login Failed',
        error.message || 'Unable to login. Please try again.',
        [{ text: 'OK' }],
      );
    }
  };

  const handleWhatsappContinue = () => {
    console.log('WhatsApp continue pressed');
    Alert.alert('Coming Soon', 'WhatsApp login will be available soon!');
  };

  const handleLanguagePress = () => {
    console.log('Language selector pressed');
    Alert.alert('Language Selection', 'Language selection coming soon!');
  };

  const CountryCodeComponent = () => (
    <View style={styles.countryCodeContainer}>
      <Image
        style={styles.flagIcon}
        source={Logos.INDIAN_FLAG}
        resizeMode="cover"
      />
      <CommonText medium color={Colors.TEXT_PRIMARY}>
        {Strings.LOGIN.COUNTRY_CODE}
      </CommonText>
    </View>
  );

  const isPhoneValid = phoneNumber.length === 10;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Pressable style={styles.logoContainer} onPress={() => {}}>
            <CommonText bold color={Colors.TEXT_LIGHT} variant="heading">
              {Strings.LOGIN.LOGO_TEXT}
            </CommonText>
          </Pressable>
          <Pressable
            style={styles.languageSelector}
            onPress={handleLanguagePress}
          >
            <CommonText semibold variant="caption" color={Colors.GRAY_700}>
              {Strings.LOGIN.LANGUAGE}
            </CommonText>
            <Image
              style={styles.dropdownIcon}
              source={Logos.DROPDOWN_ICON}
              resizeMode="cover"
            />
          </Pressable>
        </View>

        {/* Main Content Section */}
        <View style={styles.mainContent}>
          {/* Title and Subtitle */}
          <View style={styles.titleContainer}>
            <CommonText bold variant="heading" color={Colors.TEXT_PRIMARY}>
              {Strings.LOGIN.HEADING}
            </CommonText>
            <CommonText variant="body" color={Colors.TEXT_SECONDARY}>
              {Strings.LOGIN.SUBHEADING}
            </CommonText>
          </View>

          {/* Phone Input Field */}
          <CommonInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={Strings.LOGIN.INPUT_PLACEHOLDER}
            keyboardType="phone-pad"
            leftComponent={<CountryCodeComponent />}
            maxLength={10}
            editable={!isLoading}
          />

          {/* Next Button */}
          <CommonButton
            title={isLoading ? 'Please wait...' : Strings.LOGIN.BUTTON_NEXT}
            variant={isPhoneValid && !isLoading ? 'primary' : 'secondary'}
            onPress={handleNext}
            textColor={
              isPhoneValid && !isLoading ? Colors.WHITE : Colors.TEXT_DISABLED
            }
            backgroundColor={
              isPhoneValid && !isLoading ? Colors.PRIMARY_500 : Colors.GRAY_200
            }
            disabled={!isPhoneValid || isLoading}
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerTextContainer}>
              <CommonText variant="caption" color={Colors.TEXT_PLACEHOLDER}>
                {Strings.LOGIN.DIVIDER_TEXT}
              </CommonText>
            </View>
            <View style={styles.dividerLine} />
          </View>

          {/* WhatsApp Button */}
          <CommonButton
            title={Strings.LOGIN.WHATSAPP_BUTTON}
            variant="ghost"
            onPress={handleWhatsappContinue}
            leftIcon={Logos.WHATSAPP_ICON}
            backgroundColor={Colors.F5F5F5}
            borderColor={Colors.BORDER_SECONDARY}
            textColor={Colors.BLACK}
            disabled={isLoading}
          />
        </View>

        {/* Disclaimer */}
        <CommonText
          variant="caption"
          color={Colors.TEXT_SECONDARY}
          style={styles.disclaimer}
        >
          {Strings.LOGIN.DISCLAIMER}
        </CommonText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Scale.SCALE_16,
    paddingTop: Scale.SCALE_24,
    paddingBottom: Scale.SCALE_20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: Scale.SCALE_24,
  },
  logoContainer: {
    width: Scale.SCALE_48,
    height: Scale.SCALE_48,
    borderRadius: Scale.BORDER_RADIUS_4,
    backgroundColor: Colors.PRIMARY_500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.GRAY_100,
    paddingLeft: Scale.SCALE_16,
    paddingRight: Scale.SCALE_8,
    paddingTop: Scale.SCALE_4,
    paddingBottom: Scale.SCALE_4,
    borderRadius: Scale.BORDER_RADIUS_100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    gap: Scale.SCALE_4,
  },
  dropdownIcon: {
    width: Scale.SCALE_19,
    height: Scale.SCALE_19,
  },
  mainContent: {
    gap: Scale.SCALE_12,
    alignSelf: 'stretch',
    flex: 1,
  },
  titleContainer: {
    gap: Scale.SCALE_4,
    alignSelf: 'stretch',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_8,
  },
  flagIcon: {
    width: Scale.SCALE_20,
    height: Scale.SCALE_20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_8,
    alignSelf: 'stretch',
  },
  dividerLine: {
    flex: 1,
    height: Scale.SCALE_1,
    borderTopWidth: Scale.SCALE_1,
    borderColor: Colors.BORDER_DIVIDER,
    borderStyle: 'solid',
  },
  dividerTextContainer: {
    paddingBottom: Scale.SCALE_4,
  },
  disclaimer: {
    marginTop: Scale.SCALE_20,
  },
});
