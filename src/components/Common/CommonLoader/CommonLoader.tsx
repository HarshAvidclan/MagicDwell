// src/Common/CommonLoader/CommonLoader.tsx

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Scale } from '../../Constants';

export type LoaderType = 'spinner' | 'dots' | 'pulse' | 'bars';

export interface CommonLoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    type?: LoaderType;
    style?: ViewStyle;
}

export const CommonLoader: React.FC<CommonLoaderProps> = ({
    size = 'medium',
    color = Colors.WHITE,
    type = 'dots',
    style,
}) => {
    const animation1 = useRef(new Animated.Value(0)).current;
    const animation2 = useRef(new Animated.Value(0)).current;
    const animation3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (type === 'spinner') {
            const spinAnimation = Animated.loop(
                Animated.timing(animation1, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            );
            spinAnimation.start();
            return () => spinAnimation.stop();
        }

        if (type === 'dots') {
            const createDotAnimation = (animValue: Animated.Value, delay: number) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.timing(animValue, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animValue, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ])
                );

            const anim1 = createDotAnimation(animation1, 0);
            const anim2 = createDotAnimation(animation2, 200);
            const anim3 = createDotAnimation(animation3, 400);

            anim1.start();
            anim2.start();
            anim3.start();

            return () => {
                anim1.stop();
                anim2.stop();
                anim3.stop();
            };
        }

        if (type === 'pulse') {
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(animation1, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation1, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();
            return () => pulseAnimation.stop();
        }

        if (type === 'bars') {
            const createBarAnimation = (animValue: Animated.Value, delay: number) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.timing(animValue, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animValue, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ])
                );

            const anim1 = createBarAnimation(animation1, 0);
            const anim2 = createBarAnimation(animation2, 150);
            const anim3 = createBarAnimation(animation3, 300);

            anim1.start();
            anim2.start();
            anim3.start();

            return () => {
                anim1.stop();
                anim2.stop();
                anim3.stop();
            };
        }
    }, [type, animation1, animation2, animation3]);

    const getDotSize = () => {
        switch (size) {
            case 'small':
                return Scale.SCALE_4;
            case 'medium':
                return Scale.SCALE_6;
            case 'large':
                return Scale.SCALE_8;
            default:
                return Scale.SCALE_6;
        }
    };

    const getBarSize = () => {
        switch (size) {
            case 'small':
                return { width: Scale.SCALE_2, height: Scale.SCALE_12 };
            case 'medium':
                return { width: Scale.SCALE_3, height: Scale.SCALE_16 };
            case 'large':
                return { width: Scale.SCALE_4, height: Scale.SCALE_20 };
            default:
                return { width: Scale.SCALE_3, height: Scale.SCALE_16 };
        }
    };

    const getSpinnerSize = () => {
        switch (size) {
            case 'small':
                return Scale.SCALE_16;
            case 'medium':
                return Scale.SCALE_20;
            case 'large':
                return Scale.SCALE_24;
            default:
                return Scale.SCALE_20;
        }
    };

    if (type === 'spinner') {
        const spin = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        const spinnerSize = getSpinnerSize();

        return (
            <View style={[styles.container, style]}>
                <Animated.View
                    style={[
                        styles.spinner,
                        {
                            width: spinnerSize,
                            height: spinnerSize,
                            borderColor: color,
                            borderTopColor: 'transparent',
                            transform: [{ rotate: spin }],
                        },
                    ]}
                />
            </View>
        );
    }

    if (type === 'dots') {
        const dotSize = getDotSize();
        const gap = size === 'small' ? Scale.SCALE_4 : size === 'large' ? Scale.SCALE_8 : Scale.SCALE_6;

        const scale1 = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        });

        const scale2 = animation2.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        });

        const scale3 = animation3.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        });

        const opacity1 = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        });

        const opacity2 = animation2.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        });

        const opacity3 = animation3.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        });

        return (
            <View style={[styles.dotsContainer, { gap }, style]}>
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: dotSize,
                            height: dotSize,
                            backgroundColor: color,
                            transform: [{ scale: scale1 }],
                            opacity: opacity1,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: dotSize,
                            height: dotSize,
                            backgroundColor: color,
                            transform: [{ scale: scale2 }],
                            opacity: opacity2,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: dotSize,
                            height: dotSize,
                            backgroundColor: color,
                            transform: [{ scale: scale3 }],
                            opacity: opacity3,
                        },
                    ]}
                />
            </View>
        );
    }

    if (type === 'pulse') {
        const spinnerSize = getSpinnerSize();

        const scale = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.3],
        });

        const opacity = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        });

        return (
            <View style={[styles.container, style]}>
                <Animated.View
                    style={[
                        styles.pulse,
                        {
                            width: spinnerSize,
                            height: spinnerSize,
                            backgroundColor: color,
                            transform: [{ scale }],
                            opacity,
                        },
                    ]}
                />
            </View>
        );
    }

    if (type === 'bars') {
        const barSize = getBarSize();
        const gap = size === 'small' ? Scale.SCALE_2 : size === 'large' ? Scale.SCALE_4 : Scale.SCALE_3;

        const scaleY1 = animation1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        });

        const scaleY2 = animation2.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        });

        const scaleY3 = animation3.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        });

        return (
            <View style={[styles.barsContainer, { gap }, style]}>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: barSize.width,
                            height: barSize.height,
                            backgroundColor: color,
                            transform: [{ scaleY: scaleY1 }],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: barSize.width,
                            height: barSize.height,
                            backgroundColor: color,
                            transform: [{ scaleY: scaleY2 }],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: barSize.width,
                            height: barSize.height,
                            backgroundColor: color,
                            transform: [{ scaleY: scaleY3 }],
                        },
                    ]}
                />
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        borderWidth: Scale.SCALE_2,
        borderRadius: Scale.SCALE_100,
        borderStyle: 'solid',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        borderRadius: Scale.SCALE_100,
    },
    pulse: {
        borderRadius: Scale.SCALE_100,
    },
    barsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        borderRadius: Scale.SCALE_2,
    },
});