import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonButton } from '../../../Common';
import { Colors, Scale, Strings } from '../../../Constants';

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
            {/* Back Button - Hide on first step */}
            <View style={styles.buttonWrapper}>
                {currentStep > 1 && (
                    <CommonButton
                        title="Back"
                        variant="secondary"
                        onPress={onBack}
                        disabled={isLoading}
                    />
                )}
            </View>

            {/* Continue/Submit Button */}
            <View style={styles.buttonWrapper}>
                <CommonButton
                    title={
                        currentStep === totalSteps
                            ? 'Post Property'
                            : Strings.POST_LISTING.CONTINUE
                    }
                    onPress={onContinue}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: Scale.SCALE_16,
    },
    buttonWrapper: {
        flex: 1,
    },
});
