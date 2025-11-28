// src/Screens/Guest/LoginScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Scale, Strings, Logos } from '../../Constants';
import { CommonText, CommonInput, CommonButton } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../../Types/Navigation';

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    console.log('Next button pressed', phoneNumber);
    // TODO: Navigate to OTP screen or handle login
  };

  const handleWhatsappContinue = () => {
    console.log('WhatsApp continue pressed');
  };

  const handleLanguagePress = () => {
    console.log('Language selector pressed');
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
          />

          {/* Next Button */}
          <CommonButton
            title={Strings.LOGIN.BUTTON_NEXT}
            variant={isPhoneValid ? 'primary' : 'secondary'}
            onPress={handleNext}
            textColor={isPhoneValid ? Colors.WHITE : Colors.TEXT_DISABLED}
            backgroundColor={
              isPhoneValid ? Colors.PRIMARY_500 : Colors.GRAY_200
            }
            disabled={!isPhoneValid}
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
