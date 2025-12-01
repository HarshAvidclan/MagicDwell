import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Scale, Strings, Logos } from '../../Constants';
import {
  CommonText,
  CommonInput,
  CommonButton,
  CommonCheckbox,
  CommonCitySelector,
} from '../../Common';
import {
  AccountDetailsScreenNavigationProp,
  GuestStackParamList,
  Routes,
} from '../../../Types';
import { MapplsAutosuggestResult } from '../../../Services/API/Result/resultIndex';

interface AccountDetailsScreenProps {}

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = () => {
  const navigation = useNavigation<AccountDetailsScreenNavigationProp>();
  const route =
    useRoute<RouteProp<GuestStackParamList, typeof Routes.ACCOUNT_DETAILS>>();

  const { phoneNumber, isNewAccount } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityData, setSelectedCityData] =
    useState<MapplsAutosuggestResult.SuggestedLocation | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isCitySelectorVisible, setIsCitySelectorVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCityPress = () => {
    setIsCitySelectorVisible(true);
  };

  const handleCitySelect = (city: MapplsAutosuggestResult.SuggestedLocation) => {
    setSelectedCity(`${city.placeName}, ${city.placeAddress}`);
    setSelectedCityData(city);
    setIsCitySelectorVisible(false);
  };

  const handleContinue = () => {
    console.log('Account Details:', {
      phoneNumber,
      name,
      email,
      selectedCity,
      selectedCityData,
      agreedToTerms,
      isNewAccount,
    });
    // TODO: Save account details and navigate to next screen (e.g., Home)
  };

  const isFormValid =
    name.trim() !== '' && selectedCity !== '' && agreedToTerms;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Image
              source={Logos.CHEVRON_LEFT_ICON}
              style={styles.backIcon}
              resizeMode="cover"
            />
          </Pressable>
          <CommonText bold variant="heading" color={Colors.BLACK}>
            {Strings.ACCOUNT_DETAILS.SCREEN_TITLE}
          </CommonText>
          <View style={styles.placeholder} />
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
              {Strings.ACCOUNT_DETAILS.NAME_LABEL}
            </CommonText>
            <CommonInput
              value={name}
              onChangeText={setName}
              placeholder={Strings.ACCOUNT_DETAILS.NAME_PLACEHOLDER}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
              {Strings.ACCOUNT_DETAILS.EMAIL_LABEL}
            </CommonText>
            <CommonInput
              value={email}
              onChangeText={setEmail}
              placeholder={Strings.ACCOUNT_DETAILS.EMAIL_PLACEHOLDER}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          {/* City Selector */}
          <View style={styles.inputGroup}>
            <CommonText semibold variant="body" color={Colors.BLACK}>
              {Strings.ACCOUNT_DETAILS.CITY_LABEL}
            </CommonText>
            <Pressable onPress={handleCityPress}>
              <View style={styles.citySelector}>
                <CommonText
                  variant="body"
                  color={
                    selectedCity ? Colors.TEXT_PRIMARY : Colors.TEXT_PLACEHOLDER
                  }
                  style={styles.citySelectorText}
                >
                  {selectedCity || Strings.ACCOUNT_DETAILS.CITY_PLACEHOLDER}
                </CommonText>
                <Image
                  source={Logos.Input_DropDown}
                  style={styles.chevronIcon}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          </View>

          {/* Terms and Conditions Checkbox */}
          <View style={styles.termsContainer}>
            <CommonCheckbox
              checked={agreedToTerms}
              onToggle={() => setAgreedToTerms(!agreedToTerms)}
            />
            <CommonText variant="body" style={styles.termsText}>
              <CommonText variant="body" color={Colors.GRAY_500}>
                {Strings.ACCOUNT_DETAILS.TERMS_PREFIX}
              </CommonText>
              <CommonText semibold variant="body" color={Colors.GRAY_700}>
                {Strings.ACCOUNT_DETAILS.TERMS_OF_SERVICE}
              </CommonText>
              <CommonText variant="body" color={Colors.GRAY_500}>
                {Strings.ACCOUNT_DETAILS.TERMS_AND}
              </CommonText>
              <CommonText semibold variant="body" color={Colors.GRAY_700}>
                {Strings.ACCOUNT_DETAILS.PRIVACY_POLICY}
              </CommonText>
            </CommonText>
          </View>

          {/* Continue Button */}
          <CommonButton
            title={Strings.ACCOUNT_DETAILS.BUTTON_CONTINUE}
            variant={isFormValid ? 'primary' : 'secondary'}
            onPress={handleContinue}
            disabled={!isFormValid}
            backgroundColor={
              isFormValid ? Colors.PRIMARY_500 : Colors.TEXT_DISABLED
            }
            textColor={isFormValid ? Colors.TEXT_LIGHT : Colors.TEXT_DISABLED}
          />
        </View>
      </ScrollView>

      {/* City Selector Modal */}
      <CommonCitySelector
        visible={isCitySelectorVisible}
        onClose={() => setIsCitySelectorVisible(false)}
        onSelectCity={handleCitySelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Scale.SCALE_16,
    paddingTop: Scale.SCALE_24,
    paddingBottom: Scale.SCALE_20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Scale.SCALE_24,
  },
  backButton: {
    width: Scale.SCALE_42,
    height: Scale.SCALE_42,
    borderRadius: Scale.BORDER_RADIUS_12,
    borderWidth: Scale.SCALE_1,
    borderColor: Colors.BORDER_SECONDARY,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: Scale.SCALE_24,
    height: Scale.SCALE_24,
  },
  placeholder: {
    width: Scale.SCALE_42,
  },
  formContainer: {
    gap: Scale.SCALE_16,
  },
  inputGroup: {
    gap: Scale.SCALE_8,
  },
  citySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Scale.SCALE_12,
    paddingHorizontal: Scale.SCALE_20,
    borderWidth: Scale.SCALE_1,
    borderColor: Colors.BORDER_PRIMARY,
    borderStyle: 'solid',
    borderRadius: Scale.BORDER_RADIUS_100,
    backgroundColor: Colors.WHITE,
    height: Scale.SCALE_48,
  },
  citySelectorText: {
    flex: 1,
  },
  chevronIcon: {
    width: Scale.SCALE_20,
    height: Scale.SCALE_20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Scale.SCALE_8,
  },
  termsText: {
    flex: 1,
    lineHeight: Typography.LINE_HEIGHT_20,
  },
});