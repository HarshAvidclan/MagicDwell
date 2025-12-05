// src/Common/CommonTabIcon/CommonTabIcon.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonImage } from '../CommonImage/CommonImage';
import { CommonText } from '../CommonText/CommonText';
import { Scale, Colors, Typography } from '../../Constants';
import { ImageSourcePropType } from 'react-native';

export interface CommonTabIconProps {
    activeIcon: ImageSourcePropType;
    inactiveIcon: ImageSourcePropType;
    label: string;
    isActive: boolean;
    iconSize?: number;
    labelSize?: number;
    activeColor?: string;
    inactiveColor?: string;
    containerWidth?: number;
}

export const CommonTabIcon: React.FC<CommonTabIconProps> = ({
    activeIcon,
    inactiveIcon,
    label,
    isActive,
    iconSize = Scale.SCALE_28,
    labelSize = Scale.SCALE_12,
    activeColor = Colors.TAB_ACTIVE,
    inactiveColor = Colors.GRAY_500,
    containerWidth = Scale.SCALE_72,
}) => {
    return (
        <View style={[styles.container, { width: containerWidth }]}>
            <CommonImage
                source={isActive ? activeIcon : inactiveIcon}
                width={iconSize}
                height={iconSize}
                resizeMode="cover"
            />
            <CommonText
                style={[
                    styles.label,
                    {
                        fontSize: labelSize,
                        fontFamily: isActive
                            ? Typography.FONT_FAMILY_BOLD
                            : Typography.FONT_FAMILY_MEDIUM,
                        fontWeight: isActive
                            ? Typography.FONT_WEIGHT_BOLD_700
                            : Typography.FONT_WEIGHT_MEDIUM_500,
                        color: isActive ? activeColor : inactiveColor,
                    },
                ]}
                numberOfLines={1}
            >
                {label}
            </CommonText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
        lineHeight: Typography.LINE_HEIGHT_20,
    },
});