// src/Common/CommonFavouriteButton/CommonFavouriteButton.tsx

import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    ViewStyle,
    Animated,
    Platform,
} from 'react-native';
import { CommonImage } from '../CommonImage/CommonImage';
import { Scale, Colors, Logos } from '../../Constants';

export interface CommonFavouriteButtonProps extends TouchableOpacityProps {
    isFavourite?: boolean;
    onToggle?: (isFavourite: boolean) => void;
    size?: number;
    iconSize?: number;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    unfilledIcon?: any;
    filledIcon?: any;
    animationEnabled?: boolean;
}

export const CommonFavouriteButton: React.FC<CommonFavouriteButtonProps> = ({
    isFavourite = false,
    onToggle,
    size = Scale.SCALE_36,
    iconSize = Scale.SCALE_20,
    containerStyle,
    backgroundColor = Colors.FAVOURITE_BG,
    unfilledIcon = Logos.FAVOURITE_ICON,
    filledIcon = Logos.FAVOURITE_FILLED_ICON,
    animationEnabled = true,
    ...rest
}) => {
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (animationEnabled) {
            // Scale animation on press
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 0.85,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleValue, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]).start();
        }

        onToggle?.(!isFavourite);
    };

    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={handlePress}
            activeOpacity={0.8}
            {...rest}
        >
            <Animated.View
                style={[
                    styles.circleBackground,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: backgroundColor,
                        transform: [{ scale: scaleValue }],
                    },
                ]}
            >
                <CommonImage
                    source={isFavourite ? filledIcon : unfilledIcon}
                    width={iconSize}
                    height={iconSize}
                    resizeMode="contain"
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        // ✅ Box shadow matching your design: 1px 2px 16px 2px rgba(0, 0, 0, 0.04)
        ...Platform.select({
            ios: {
                shadowColor: Colors.FAVOURITE_SHADOW,
                shadowOffset: {
                    width: Scale.SCALE_1,
                    height: Scale.SCALE_2
                },
                shadowOpacity: 1, // Opacity already in color
                shadowRadius: Scale.SCALE_16,
            },
            android: {
                elevation: 4,
            },
        }),
    },
});