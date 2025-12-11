// src/components/Buyer/BuyerPostListingVehicleScreen/VehicleFooter/VehicleFooter.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonButton } from '../../../Common';
import { Colors, Scale, Strings, Typography } from '../../../Constants';

interface VehicleFooterProps {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onContinue: () => void;
    isLoading?: boolean;
}

export const VehicleFooter: React.FC<VehicleFooterProps> = ({
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
                title={Strings.VEHICLE_LISTING.BACK}
                buttonStyle={styles.backButton}
                textStyle={styles.backButtonText}
                onPress={onBack}
                disabled={isLoading}
            />

            {/* Continue Button */}
            <CommonButton
                variant="outline"
                title={
                    currentStep === totalSteps
                        ? Strings.VEHICLE_LISTING.PUBLISH_LISTING
                        : Strings.VEHICLE_LISTING.CONTINUE
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
        height: Scale.SCALE_49 ? Scale.SCALE_49 : 49,
        flex: 1,
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
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        lineHeight: 24,
        fontSize: 16,
        color: Colors.BLACK,
    },
    continueButton: {
        height: 48,
        flex: 2.2,
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