// src/Screens/Guest/VerifyOTPScreen.tsx
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Scale, Strings, Logos } from '../../Constants';
import { CommonText, CommonButton } from '../../Common';
import {
  GuestStackParamList,
  Routes,
  VerifyOTPScreenNavigationProp,
} from '../../../Types';

interface VerifyOTPScreenProps {}

export const VerifyOTPScreen: React.FC<VerifyOTPScreenProps> = () => {
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route =
    useRoute<RouteProp<GuestStackParamList, typeof Routes.VERIFY_OTP>>();
  const { phoneNumber } = route.params;

  // hold digits as strings
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  // refs for each TextInput
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleBack = () => navigation.goBack();

  const handleVerify = () => {
    const otpValue = otp.join('');
    console.log('Verify OTP:', otpValue, 'for phone:', phoneNumber);
    const isNewAccount = true; // This should come from your API response

    // Navigate to AccountDetails screen
    navigation.navigate(Routes.ACCOUNT_DETAILS, {
      phoneNumber,
      isNewAccount,
    });

    Keyboard.dismiss();
  };

  const handleEditPhone = () => navigation.goBack();

  const handleResend = () => {
    console.log('Resend OTP');
    // TODO: Implement resend OTP logic
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  // when a digit changes
  const onChangeDigit = (text: string, index: number) => {
    // If user pasted the whole OTP (text length > 1), distribute across boxes
    if (text.length > 1) {
      const chars = text.split('').slice(0, 6 - index);
      setOtp(prev => {
        const copy = [...prev];
        for (let i = 0; i < chars.length; i++) {
          copy[index + i] = chars[i];
        }
        return copy;
      });

      const nextIndex = Math.min(index + chars.length, otp.length - 1);
      // focus next appropriate input (if not last)
      const nextRef = inputRefs.current[nextIndex];
      nextRef?.focus();
      return;
    }

    // normal single char entry (or empty on delete)
    setOtp(prev => {
      const newArr = [...prev];
      newArr[index] = text;
      return newArr;
    });

    if (text) {
      // move to next input if exists
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
      else Keyboard.dismiss();
    }
  };

  // handle key presses for backspace to move focus backward
  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '') {
        // move to previous if current empty
        const prevRef = inputRefs.current[index - 1];
        if (prevRef) {
          prevRef.focus();
          setOtp(prev => {
            const copy = [...prev];
            copy[index - 1] = '';
            return copy;
          });
        }
      } else {
        // clear current (handled by onChangeText when value becomes '')
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Image
              source={Logos.CHEVRON_LEFT_ICON}
              style={styles.backIcon}
              resizeMode="cover"
            />
          </Pressable>
          <CommonText bold variant="heading" color={Colors.TEXT_PRIMARY}>
            {Strings.VERIFY_OTP.SCREEN_TITLE}
          </CommonText>
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <CommonText bold variant="heading" color={Colors.TEXT_PRIMARY}>
              {Strings.VERIFY_OTP.HEADING}
            </CommonText>
            <View style={styles.phoneSection}>
              <CommonText variant="body" color={Colors.TEXT_SECONDARY}>
                {Strings.VERIFY_OTP.SENT_TO_PREFIX}
              </CommonText>
              <CommonText medium variant="body" color={Colors.TEXT_PRIMARY}>
                {phoneNumber}
              </CommonText>
              <Pressable onPress={handleEditPhone} style={styles.editButton}>
                <Image
                  source={Logos.VERIFY_OTP_EDIT}
                  style={styles.editIcon}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          </View>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <TextInput
                  ref={el => {
                    inputRefs.current[index] = el;
                  }} // <- fixed: no returned value
                  value={digit}
                  onChangeText={text =>
                    onChangeDigit(text.replace(/[^0-9]/g, ''), index)
                  }
                  onKeyPress={e => onKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6} // allow paste of multiple digits; we'll distribute
                  style={styles.otpInput}
                  textAlign="center"
                  selectionColor={Colors.PRIMARY_500}
                  returnKeyType="done"
                  importantForAutofill="yes"
                  autoFocus={index === 0}
                />
              </View>
            ))}
          </View>

          {/* Verify Button */}
          <CommonButton
            title={Strings.VERIFY_OTP.BUTTON_VERIFY}
            variant={isOtpComplete ? 'primary' : 'secondary'}
            onPress={handleVerify}
            disabled={!isOtpComplete}
            backgroundColor={
              isOtpComplete ? Colors.PRIMARY_500 : Colors.GRAY_200
            }
            textColor={isOtpComplete ? Colors.TEXT_LIGHT : Colors.TEXT_DISABLED}
          />

          {/* Resend Section - moved below Verify button */}
          <Pressable style={styles.resendContainer} onPress={handleResend}>
            <Pressable style={styles.messageIconButton} onPress={handleResend}>
              <Image
                source={Logos.MESSAGES}
                style={styles.messagesIcon}
                resizeMode="cover"
              />
            </Pressable>
            <CommonText variant="body" color={Colors.GRAY_500}>
              {Strings.VERIFY_OTP.RESEND_PREFIX}
            </CommonText>
            <CommonText semibold variant="body" color={Colors.GRAY_700}>
              {Strings.VERIFY_OTP.RESEND_SUFFIX}
            </CommonText>
          </Pressable>
        </View>
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
  messageIconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Scale.SCALE_2,
  },
  messagesIcon: {
    width: Scale.SCALE_20,
    height: Scale.SCALE_20,
  },
  placeholder: {
    width: Scale.SCALE_42,
  },
  mainContent: {
    gap: Scale.SCALE_16,
    flex: 1,
  },
  titleSection: {
    gap: Scale.SCALE_4,
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_4,
  },
  editButton: {
    width: Scale.SCALE_16,
    height: Scale.SCALE_16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: Scale.SCALE_16,
    height: Scale.SCALE_16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: Scale.SCALE_10,
    marginTop: Scale.SCALE_8,
    marginBottom: Scale.SCALE_8,
  },
  otpBox: {
    width: Scale.SCALE_48,
    height: Scale.SCALE_48,
    borderRadius: Scale.BORDER_RADIUS_8,
    borderWidth: Scale.SCALE_1,
    borderColor: Colors.BORDER_SECONDARY,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_24,
    color: Colors.BLACK,
    padding: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    paddingHorizontal: Scale.SCALE_16,
    paddingVertical: Scale.SCALE_8,
    borderWidth: Scale.SCALE_1,
    borderColor: Colors.BORDER_PRIMARY,
    borderStyle: 'solid',
    borderRadius: Scale.BORDER_RADIUS_100,
    alignItems: 'center',
    // gap: Scale.SCALE_8,
    alignSelf: 'flex-start',
    marginTop: Scale.SCALE_12,
  },
});
