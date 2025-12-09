import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonButton } from '../../../Common';
import { Colors, Scale, Strings, Typography } from '../../../Constants';

interface PropertyFooterProps {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onContinue: () => void;
    isLoading?: boolean;
}

export const PropertyFooter: React.FC<PropertyFooterProps> = ({
    currentStep,
    totalSteps,
    onBack,
    onContinue,
    isLoading = false,
}) => {
    return (
        <View style={styles.container}>
            {/* Back Button */}
            <CommonButton
                title={Strings.PROPERTY_LISTING.BACK} // "Back"
                buttonStyle={styles.backButton}
                textStyle={styles.backButtonText}
                onPress={onBack}
                disabled={currentStep === 1 || isLoading}
            />

            {/* Continue Button */}
            <CommonButton
                variant="outline"
                title={
                    currentStep === totalSteps
                        ? Strings.PROPERTY_LISTING.PREVIEW_AND_PUBLISH
                        : Strings.PROPERTY_LISTING.CONTINUE
                }
                buttonStyle={styles.continueButton}
                textStyle={styles.continueButtonText}
                onPress={onContinue}
                loading={isLoading}
                disabled={isLoading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        gap: Scale.SCALE_12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    backButton: {
        height: Scale.SCALE_49 ? Scale.SCALE_49 : 49, // Fallback if scale missing
        // width: 107, // Fixed width causes overflow on small screens
        flex: 1, // Use flex to be responsive (approx 30%)
        backgroundColor: Colors.WHITE,
        borderStyle: 'solid',
        borderColor: Colors.BLACK,
        borderWidth: 1,
        borderRadius: 100,
        padding: Scale.SCALE_16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        textAlign: 'center',
        fontFamily: Typography.FONT_FAMILY_MEDIUM, // Urbanist-Medium
        fontWeight: '500',
        lineHeight: 24,
        fontSize: 16,
        color: Colors.BLACK,
    },
    continueButton: {
        height: 48,
        // width: 240, // Fixed width causes overflow
        flex: 2.2, // Maintain approx ratio of 240/107 ~= 2.2
        backgroundColor: Colors.PRIMARY_500,
        borderRadius: 100,
        padding: Scale.SCALE_16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        textAlign: 'center',
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        lineHeight: 24,
        fontSize: 16,
        color: Colors.WHITE,
    },
});
