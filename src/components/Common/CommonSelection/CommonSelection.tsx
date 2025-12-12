// src/Common/CommonSelection/CommonSelection.tsx

import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Image,
    ImageSourcePropType,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { CommonText, CommonCheckbox } from '..';
import { Colors, Scale, Typography } from '../../Constants';

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
    disabledValues?: (string | number)[]; // NEW: Array of disabled option values
    containerStyle?: ViewStyle;
    optionStyle?: ViewStyle;
    selectedOptionStyle?: ViewStyle;
    disabledOptionStyle?: ViewStyle; // NEW: Style for disabled options
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    disabledTextStyle?: TextStyle; // NEW: Text style for disabled options
    iconSize?: number;
}

export const CommonSelection: React.FC<CommonSelectionProps> = ({
    options,
    selectedValues = [],
    selectedValue,
    onSelect,
    isMulti = false,
    showCheckbox = false,
    disabledValues = [], // NEW: Default to empty array
    containerStyle,
    optionStyle,
    selectedOptionStyle,
    disabledOptionStyle, // NEW
    textStyle,
    selectedTextStyle,
    disabledTextStyle, // NEW
    iconSize = Scale.SCALE_20,
}) => {
    const isSelected = (value: string | number): boolean => {
        if (isMulti) {
            return selectedValues.includes(value);
        }
        return selectedValue === value;
    };

    const isDisabled = (value: string | number): boolean => {
        return disabledValues.includes(value);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option, index) => {
                const selected = isSelected(option.value);
                const disabled = isDisabled(option.value);

                return (
                    <Pressable
                        key={`${option.value}-${index}`}
                        style={[
                            styles.option,
                            selected && styles.selectedOption,
                            disabled && styles.disabledOption, // NEW
                            optionStyle,
                            selected && selectedOptionStyle,
                            disabled && disabledOptionStyle, // NEW
                        ]}
                        onPress={() => !disabled && onSelect(option.value)} // NEW: Prevent press if disabled
                        disabled={disabled} // NEW: Native disabled prop
                    >
                        {/* Checkbox for single-select or multi-select when showCheckbox is true */}
                        {showCheckbox && (
                            <CommonCheckbox
                                checked={selected}
                                onToggle={() => !disabled && onSelect(option.value)}
                                style={styles.checkbox}
                                disabled={disabled} // NEW: Pass disabled to checkbox
                            />
                        )}

                        {/* Icon */}
                        {option.icon && (
                            <Image
                                source={option.icon}
                                style={[
                                    styles.icon,
                                    { width: iconSize, height: iconSize },
                                    disabled && styles.disabledIcon, // NEW
                                ]}
                                resizeMode="contain"
                            />
                        )}

                        {/* Label */}
                        <CommonText
                            semibold={selected && !disabled}
                            medium={!selected || disabled}
                            variant="body"
                            color={
                                disabled
                                    ? Colors.GRAY_300 // NEW: Disabled color
                                    : selected
                                        ? Colors.PRIMARY_400
                                        : Colors.GRAY_500
                            }
                            style={[
                                styles.label,
                                textStyle,
                                selected && selectedTextStyle,
                                disabled && disabledTextStyle, // NEW
                            ]}
                        >
                            {option.label}
                        </CommonText>
                    </Pressable>
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
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Scale.SCALE_8,
        paddingHorizontal: Scale.SCALE_24, // Changed from SCALE_16 to match Figma
        borderRadius: Scale.BORDER_RADIUS_8,
        borderWidth: Scale.SCALE_1,
        borderStyle: 'solid',
        borderColor: Colors.GRAY_200,
        backgroundColor: Colors.WHITE,
        gap: Scale.SCALE_4,
    },
    selectedOption: {
        backgroundColor: Colors.BACKGROUND_SELECTED,
        borderColor: Colors.PRIMARY_300,
    },
    disabledOption: { // NEW
        backgroundColor: Colors.WHITE,
        borderColor: Colors.GRAY_200,
        opacity: 1, // Keep full opacity, color changes handle the disabled look
    },
    icon: {
        // Size set dynamically via iconSize prop
    },
    disabledIcon: { // NEW
        opacity: 0.4,
    },
    label: {
        lineHeight: Typography.LINE_HEIGHT_20,
        fontSize: Typography.FONT_SIZE_14, // Added explicit font size
    },
    checkbox: {
        marginRight: Scale.SCALE_4,
    },
});