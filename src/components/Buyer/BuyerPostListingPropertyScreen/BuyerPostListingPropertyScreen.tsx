import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonText } from '../../Common';
import { Colors, Scale, Typography } from '../../Constants';


export const BuyerPostListingPropertyScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <CommonText style={styles.title}>
                    Post Property Listing
                </CommonText>
                <CommonText style={styles.subtitle}>
                    Property listing form will go here
                </CommonText>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.BACKGROUND_PRIMARY,
    },
    content: {
        padding: Scale.SCALE_16,
        gap: Scale.SCALE_16,
    },
    title: {
        fontSize: Typography.FONT_SIZE_20,
        lineHeight: Typography.LINE_HEIGHT_28,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        // fontWeight: Typography.FONT_WEIGHT_700,
        color: Colors.TEXT_PRIMARY,
    },
    subtitle: {
        fontSize: Typography.FONT_SIZE_16,
        lineHeight: Typography.LINE_HEIGHT_24,
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        color: Colors.TEXT_SECONDARY,
    },
});