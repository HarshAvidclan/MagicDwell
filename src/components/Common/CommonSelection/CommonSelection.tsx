// src/Common/CommonSelection/CommonSelection.tsx

import React, { useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Image,
    ImageSourcePropType,
    ViewStyle,
    TextStyle,
    LayoutChangeEvent,
} from 'react-native';
import { CommonText, CommonCheckbox } from '..';
import { Colors, Scale, Strings, Typography } from '../../Constants';

export interface SelectionOption {
    value: string | number;
    label: string;
    icon?: ImageSourcePropType;
}

export interface CommonSelectionProps {
    options: SelectionOption[];
    selectedValues?: (string | number)[];
    selectedValue?: string | number;
    onSelect: (value: string | number) => void;
    isMulti?: boolean;
    showCheckbox?: boolean;
    disabledValues?: (string | number)[];
    comingSoonValues?: (string | number)[]; // ⭐ NEW
    containerStyle?: ViewStyle;
    optionStyle?: ViewStyle;
    selectedOptionStyle?: ViewStyle;
    disabledOptionStyle?: ViewStyle;
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    disabledTextStyle?: TextStyle;
    iconSize?: number;
}

export const CommonSelection: React.FC<CommonSelectionProps> = ({
    options,
    selectedValues = [],
    selectedValue,
    onSelect,
    isMulti = false,
    showCheckbox = false,
    disabledValues = [],
    comingSoonValues = [], // ⭐ Default empty
    containerStyle,
    optionStyle,
    selectedOptionStyle,
    disabledOptionStyle,
    textStyle,
    selectedTextStyle,
    disabledTextStyle,
    iconSize = Scale.SCALE_20,
}) => {
    const [layoutMap, setLayoutMap] = useState<{ [key: string]: { x: number; width: number } }>({});

    const isSelected = (value: string | number): boolean => {
        if (isMulti) {
            return selectedValues.includes(value);
        }
        return selectedValue === value;
    };

    const isDisabled = (value: string | number): boolean => {
        return disabledValues.includes(value);
    };

    const isComingSoon = (value: string | number): boolean => {
        return comingSoonValues.includes(value);
    };

    const handleLayout =
        (value: string | number) =>
            (e: LayoutChangeEvent) => {
                const { x, width } = e.nativeEvent.layout;
                setLayoutMap((prev) => ({
                    ...prev,
                    [value]: { x, width },
                }));
            };

    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option, index) => {
                const { value } = option;
                const selected = isSelected(value);
                const disabled = isDisabled(value);
                const comingSoon = isComingSoon(value);
                const layout = layoutMap[value];

                return (
                    <View key={`${value}-${index}`} style={{ position: 'relative' }}>
                        {/* ⭐ Dynamic Coming Soon Label */}
                        {comingSoon && layout && (
                            <View
                                style={[
                                    styles.comingSoonBadge,
                                    {
                                        left: layout.x + layout.width / 2 - Scale.SCALE_76 / 2,
                                    },
                                ]}
                                pointerEvents="none"
                            >
                                <CommonText variant="caption" style={styles.comingSoonText}>
                                    {Strings.VEHICLE_LISTING.COMING_SOON}
                                </CommonText>
                            </View>
                        )}

                        <Pressable
                            onLayout={handleLayout(value)}
                            style={[
                                styles.option,
                                selected && styles.selectedOption,
                                disabled && styles.disabledOption,
                                optionStyle,
                                selected && selectedOptionStyle,
                                disabled && disabledOptionStyle,
                            ]}
                            onPress={() => !disabled && onSelect(value)}
                            disabled={disabled}
                        >
                            {showCheckbox && (
                                <CommonCheckbox
                                    checked={selected}
                                    onToggle={() => !disabled && onSelect(value)}
                                    style={styles.checkbox}
                                    disabled={disabled}
                                />
                            )}

                            {option.icon && (
                                <Image
                                    source={option.icon}
                                    style={[
                                        styles.icon,
                                        { width: iconSize, height: iconSize },
                                        disabled && styles.disabledIcon,
                                    ]}
                                    resizeMode="contain"
                                />
                            )}

                            <CommonText
                                semibold={selected && !disabled}
                                medium={!selected || disabled}
                                variant="body"
                                color={
                                    disabled
                                        ? Colors.GRAY_300
                                        : selected
                                            ? Colors.PRIMARY_400
                                            : Colors.GRAY_500
                                }
                                style={[
                                    styles.label,
                                    textStyle,
                                    selected && selectedTextStyle,
                                    disabled && disabledTextStyle,
                                ]}
                            >
                                {option.label}
                            </CommonText>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Scale.SCALE_8,
        position: 'relative',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale.SCALE_8,
        paddingHorizontal: Scale.SCALE_16,
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_4,
    },
    selectedOption: {
        backgroundColor: Colors.BACKGROUND_SELECTED,
        borderColor: Colors.PRIMARY_300,
    },
    disabledOption: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GRAY_200,
        opacity: 1,
    },
    icon: {},
    disabledIcon: {
        opacity: 0.4,
    },
    label: {
        lineHeight: Typography.LINE_HEIGHT_20,
        fontSize: Typography.FONT_SIZE_14,
    },
    checkbox: {
        marginRight: Scale.SCALE_4,
    },

    /* ⭐ Coming Soon Badge */
    comingSoonBadge: {
        position: 'absolute',
        top: -Scale.SCALE_6,
        paddingHorizontal: Scale.SCALE_9,
        // width: Scale.SCALE_76,
        height: Scale.SCALE_16,
        backgroundColor: Colors.BLACK,
        borderTopLeftRadius: Scale.BORDER_RADIUS_8,
        borderTopRightRadius: Scale.BORDER_RADIUS_8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    comingSoonText: {
        color: Colors.WHITE,
        fontSize: Scale.SCALE_10,
        lineHeight: Typography.LINE_HEIGHT_16,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        textAlign: 'center',
    },
});
