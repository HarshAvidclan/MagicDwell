// src/Common/CommonInput/CommonInput.tsx
import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Scale, Colors, Typography } from '../../Constants';
import { CommonText } from '../CommonText/CommonText';

export interface CommonInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  error?: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  inputHeight?: number;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export const CommonInput: React.FC<CommonInputProps> = ({
  containerStyle,
  style,
  error,
  leftIcon,
  rightIcon,
  leftComponent,
  rightComponent,
  inputHeight = Scale.SCALE_48,
  borderColor = Colors.BORDER_PRIMARY,
  backgroundColor = Colors.WHITE,
  borderRadius = Scale.BORDER_RADIUS_100,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return Colors.ERROR_500;
    if (isFocused) return Colors.PRIMARY_500;
    return borderColor;
  };

  const getTextColor = () => {
    if (error) return Colors.ERROR_500;
    return Colors.TEXT_PRIMARY;
  };

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.inputWrapper,
          {
            height: inputHeight,
            borderColor: getBorderColor(),
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
          },
        ]}
      >
        {leftIcon && (
          <Image style={styles.icon} source={leftIcon} resizeMode="cover" />
        )}
        {leftComponent && leftComponent}

        <TextInput
          {...rest}
          style={[
            styles.input,
            { color: getTextColor() },
            style,
          ]}
          placeholderTextColor={Colors.TEXT_PLACEHOLDER}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
        />

        {rightComponent && rightComponent}
        {rightIcon && (
          <Image style={styles.icon} source={rightIcon} resizeMode="cover" />
        )}
      </View>

      {error ? (
        <CommonText
          variant="caption"
          color={Colors.ERROR_500}
          style={styles.errorText}
        >
          {error}
        </CommonText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale.SCALE_8,
    paddingHorizontal: Scale.SCALE_16,
    paddingVertical: Scale.SCALE_12,
    borderWidth: Scale.SCALE_1,
    borderStyle: 'solid',
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  input: {
    flex: 1,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: Typography.FONT_WEIGHT_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_24,
    padding: 0,
  },
  icon: {
    width: Scale.SCALE_20,
    height: Scale.SCALE_20,
  },
  errorText: {
    marginTop: Scale.SCALE_4,
    marginLeft: Scale.SCALE_16,
  },
});