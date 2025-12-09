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
    containerStyle?: ViewStyle;
    optionStyle?: ViewStyle;
    selectedOptionStyle?: ViewStyle;
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    iconSize?: number;
}

export const CommonSelection: React.FC<CommonSelectionProps> = ({
    options,
    selectedValues = [],
    selectedValue,
    onSelect,
    isMulti = false,
    showCheckbox = false,
    containerStyle,
    optionStyle,
    selectedOptionStyle,
    textStyle,
    selectedTextStyle,
    iconSize = Scale.SCALE_20,
}) => {
    const isSelected = (value: string | number): boolean => {
        if (isMulti) {
            return selectedValues.includes(value);
        }
        return selectedValue === value;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option, index) => {
                const selected = isSelected(option.value);
                return (
                    <Pressable
                        key={`${option.value}-${index}`}
                        style={[
                            styles.option,
                            selected && styles.selectedOption,
                            optionStyle,
                            selected && selectedOptionStyle,
                        ]}
                        onPress={() => onSelect(option.value)}
                    >
                        {/* Checkbox for single-select or multi-select when showCheckbox is true */}
                        {showCheckbox && (
                            <CommonCheckbox
                                checked={selected}
                                onToggle={() => onSelect(option.value)}
                                style={styles.checkbox}
                            />
                        )}

                        {/* Icon */}
                        {option.icon && (
                            <Image
                                source={option.icon}
                                style={[styles.icon, { width: iconSize, height: iconSize }]}
                                resizeMode="contain"
                            />
                        )}

                        {/* Label */}
                        <CommonText
                            semibold={selected}
                            medium={!selected}
                            variant="body"
                            color={selected ? Colors.PRIMARY_400 : Colors.GRAY_500}
                            style={[
                                styles.label,
                                textStyle,
                                selected && selectedTextStyle,
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
        paddingHorizontal: Scale.SCALE_16,
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
    icon: {
        // Size set dynamically via iconSize prop
    },
    label: {
        lineHeight: Typography.LINE_HEIGHT_20,
    },
    checkbox: {
        marginRight: Scale.SCALE_4,
    },
});
