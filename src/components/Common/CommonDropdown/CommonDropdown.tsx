// src/Common/CommonDropdown/CommonDropdown.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Modal, FlatList } from 'react-native';
import { CommonText } from '../CommonText/CommonText';
import { Colors, Scale, Typography, Logos } from '../../Constants';

export interface DropdownOption {
    value: string | number;
    label: string;
}

interface CommonDropdownProps {
    options: DropdownOption[];
    selectedValue?: string | number;
    onSelect: (value: string | number) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
}

export const CommonDropdown: React.FC<CommonDropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    placeholder = 'Select option',
    label,
    error,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleSelect = (value: string | number) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            {label && (
                <CommonText semibold variant="body" color={Colors.BLACK}>
                    {label}
                </CommonText>
            )}

            <Pressable
                style={[
                    styles.dropdownButton,
                    error && styles.dropdownButtonError,
                    disabled && styles.dropdownButtonDisabled,
                ]}
                onPress={() => !disabled && setIsOpen(true)}
                disabled={disabled}
            >
                <CommonText
                    medium
                    variant="body"
                    color={selectedOption ? Colors.TEXT_PRIMARY : Colors.TEXT_PLACEHOLDER}
                    style={styles.selectedText}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </CommonText>
                <Image
                    source={Logos.CHEVRON_DOWN_ICON}
                    style={[
                        styles.chevronIcon,
                        isOpen && styles.chevronIconOpen,
                    ]}
                    resizeMode="contain"
                />
            </Pressable>

            {error && (
                <CommonText variant="caption" color={Colors.ERROR_500}>
                    {error}
                </CommonText>
            )}

            {/* Dropdown Modal */}
            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => String(item.value)}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={[
                                        styles.optionItem,
                                        index < options.length - 1 && styles.optionItemBorder,
                                        item.value === selectedValue && styles.optionItemSelected,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <CommonText
                                        variant="body"
                                        color={
                                            item.value === selectedValue
                                                ? Colors.PRIMARY_500
                                                : Colors.TEXT_PRIMARY
                                        }
                                    >
                                        {item.label}
                                    </CommonText>
                                </Pressable>
                            )}
                            style={styles.optionsList}
                            showsVerticalScrollIndicator={true}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Scale.SCALE_4,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_20,
        borderRadius: Scale.BORDER_RADIUS_100,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_300,
        borderStyle: 'solid',
        backgroundColor: Colors.WHITE,
        height: Scale.SCALE_48,
        gap: Scale.SCALE_12,
    },
    dropdownButtonError: {
        borderColor: Colors.ERROR_500,
    },
    dropdownButtonDisabled: {
        backgroundColor: Colors.GRAY_100,
        opacity: 0.6,
    },
    selectedText: {
        flex: 1,
        lineHeight: Typography.LINE_HEIGHT_20,
    },
    chevronIcon: {
        width: Scale.SCALE_16,
        height: Scale.SCALE_16,
        tintColor: Colors.GRAY_500,
    },
    chevronIconOpen: {
        transform: [{ rotate: '180deg' }],
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Scale.SCALE_16,
    },
    dropdownContainer: {
        width: '90%',
        maxHeight: '50%',
        backgroundColor: Colors.WHITE,
        borderRadius: Scale.BORDER_RADIUS_4,
        borderWidth: Scale.SCALE_1,
        borderColor: Colors.GRAY_300,
        borderStyle: 'solid',
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 18.4,
        elevation: 18.4,
    },
    optionsList: {
        flexGrow: 0,
    },
    optionItem: {
        paddingVertical: Scale.SCALE_12,
        paddingHorizontal: Scale.SCALE_12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionItemBorder: {
        borderBottomWidth: Scale.SCALE_1,
        borderBottomColor: Colors.GRAY_200,
        borderStyle: 'solid',
    },
    optionItemSelected: {
        backgroundColor: Colors.BACKGROUND_SELECTED,
    },
});