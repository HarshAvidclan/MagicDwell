// src/components/Buyer/BuyerPostListingVehicleScreen/BuyerPostListingVehicleScreen.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react'; // ✅ Add useCallback
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectionOption } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { BuyerPostListingVehicleNavigationProp, Routes } from '../../../Types/Navigation';
import { Colors, Scale } from '../../Constants';
import { VehicleStep1 } from './VehicleStep1/VehicleStep1';
import { VehicleStep2 } from './VehicleStep2/VehicleStep2';
import { VehicleStep3 } from './VehicleStep3/VehicleStep3';
import { VehicleStepHeader } from './VehicleStepHeader/VehicleStepHeader';
import { VehicleFooter } from './VehicleFooter/VehicleFooter';
import {
    VehicleAddEditInput,
    tbl_Vehicle,
    tbl_Post,
    tbl_CommonImage,
    VehicleByPostIdInput,
    VehicleMasterDataInput,
} from '../../../Services/API/Input/inputIndex';
import {
    VehicleMasterDataResult,
    VehicleByPostIdResult,
} from '../../../Services/API/Result/resultIndex';
import { API } from '../../../Services/API/Api';
import { VehicleMaster, Vehicle } from '../../../Services/API/URL/URLS';
import { DropdownOption } from '../../Common/CommonDropdown/CommonDropdown';

interface BuyerPostListingVehicleScreenProps {
    postId?: number;
    initialData?: VehicleAddEditInput;
}

// Default values
const defaultVehicle = (): tbl_Vehicle => ({
    VehicleId: 0,
    VehicleTypeId: 1, // Default to Car
    LookingToId: 0,
    BrandId: 0,
    BrandModelId: 0,
    FuelTypeId: 0,
    YearOfMfd: 0,
    DrivenKm: 0,
    NoOfOwnersId: 0,
    TransmissionId: 0,
    Location: '',
    Title: '',
    Price: 0,
    IsNegotiate: false,
    SeqNo: 1,
    PostId: 0,
});

const defaultPost = (): tbl_Post => ({
    PostId: 0,
    PostEntityId: 2, // Vehicle Entity
    UserId: '',
    SeqNo: 1,
    IsPublish: null,
    IsApproved: null,
});

const defaultAddEdit = (): VehicleAddEditInput => ({
    Post: defaultPost(),
    Vehicle: defaultVehicle(),
    VehicleImages: [],
});

export const BuyerPostListingVehicleScreen: React.FC<BuyerPostListingVehicleScreenProps> = ({
    postId,
    initialData,
}) => {
    const navigation = useNavigation<BuyerPostListingVehicleNavigationProp>();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [masterData, setMasterData] = useState<VehicleMasterDataResult | null>(null);
    const [listing, setListing] = useState<VehicleByPostIdResult | null>(null);

    // Form payload state
    const [payload, setPayload] = useState<VehicleAddEditInput>(
        initialData || defaultAddEdit(),
    );

    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

    // Fetch vehicle by postId if editing
    useEffect(() => {
        const fetchVehicle = async () => {
            if (!postId || Number(postId) <= 0) return;
            try {
                const input: VehicleByPostIdInput = { PostId: Number(postId) };
                const res = await API.POST<VehicleByPostIdResult>(
                    Vehicle.GETVEHICLEBYPOSTID,
                    input,
                );
                console.log('Fetched vehicle details:', res);
                setListing(res);
            } catch (err) {
                console.error('Failed to fetch vehicle by PostId', err);
            }
        };

        fetchVehicle();
    }, [postId]);

    // Map listing to payload
    useEffect(() => {
        if (listing) {
            console.log('Mapping listing -> payload', listing);
            const vehicle = listing.Vehicle || {};
            const post = listing.Post || {};

            setPayload({
                Post: { ...defaultPost(), ...post },
                Vehicle: { ...defaultVehicle(), ...vehicle },
                VehicleImages: listing.VehicleImages || [],
            });
        }
    }, [listing]);

    // Fetch master data when VehicleTypeId changes
    useEffect(() => {
        const fetchMasterData = async () => {
            setIsLoading(true);
            try {
                const input: VehicleMasterDataInput = {
                    VehicleTypeId: payload.Vehicle.VehicleTypeId ?? null,
                };
                const result = await API.POST<VehicleMasterDataResult>(
                    VehicleMaster.GET,
                    input,
                );
                console.log('Master data:', result);
                setMasterData(result);
            } catch (error) {
                console.error('Failed to fetch master data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMasterData();
    }, [payload.Vehicle.VehicleTypeId]);

    // ✅ FIX: Wrap in useCallback
    const setVehicleField = useCallback(<K extends keyof tbl_Vehicle>(
        field: K,
        value: tbl_Vehicle[K],
    ) => {
        setPayload((p) => ({ ...p, Vehicle: { ...p.Vehicle, [field]: value } }));
        // Clear error for this field
        setErrors((prev) => {
            const clone = { ...prev };
            delete clone[String(field)];
            return clone;
        });
    }, []);

    // ✅ FIX: Wrap in useCallback
    const handleImagesChange = useCallback((images: tbl_CommonImage[]) => {
        setPayload((p) => ({ ...p, VehicleImages: images }));
    }, []);

    // Convert master data to options
    const vehicleTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstVehicleType || []).map((vt) => ({
                value: vt.VehicleTypeId,
                label: vt.VehicleTypeName,
            })),
        [masterData],
    );

    const lookingToOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstLookingTo || []).map((lt) => ({
                value: lt.LookingToId,
                label: lt.LookingToName,
            })),
        [masterData],
    );

    const brandOptions: DropdownOption[] = useMemo(
        () =>
            (masterData?.lstBrand || []).map((b) => ({
                value: b.BrandId,
                label: b.BrandName,
            })),
        [masterData],
    );

    const carTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstChildVehicleType || []).map((ct) => ({
                value: ct.VehicleTypeId,
                label: ct.VehicleTypeName,
            })),
        [masterData],
    );

    const fuelTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstFuelType || []).map((ft) => ({
                value: ft.FuelTypeId,
                label: ft.FuelTypeName,
            })),
        [masterData],
    );

    const ownershipOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstNoOfOwners || []).map((o) => ({
                value: o.NoOfOwnersId,
                label: o.OwnersText,
            })),
        [masterData],
    );

    const transmissionOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstTransmission || []).map((t) => ({
                value: t.TransmissionId,
                label: t.TransmissionName,
            })),
        [masterData],
    );

    // Step titles
    const getStepTitle = (step: number): string => {
        switch (step) {
            case 1:
                return 'Add basic details';
            case 2:
                return 'Add vehicle details';
            case 3:
                return 'Add pricing & photos';
            default:
                return '';
        }
    };

    const getNextStepTitle = (step: number): string | null => {
        switch (step) {
            case 1:
                return 'Vehicle details';
            case 2:
                return 'Pricing & photos';
            case 3:
                return 'Happy posting';
            default:
                return null;
        }
    };

    // Navigation handlers
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const handleContinue = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
                setErrors({});
            } else {
                // Navigate to Preview
                // onPreviewAndPublish();
                handleSubmit();
            }
        }
    };

    // const onPreviewAndPublish = () => {
    //     navigation.navigate(Routes.BUYER_LISTING_PREVIEW, {
    //         data: payload,
    //         masterData: masterData,
    //         type: 'vehicle',
    //     });
    // };

    // Validation
    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<string, string>> = {};
        const v = payload.Vehicle;

        switch (step) {
            case 1:
                if (!v.VehicleTypeId || v.VehicleTypeId <= 0) {
                    newErrors.VehicleTypeId = 'Vehicle type is required';
                }
                if (!v.LookingToId || v.LookingToId <= 0) {
                    newErrors.LookingToId = 'Looking to is required';
                }
                if (!v.Location || v.Location.trim() === '') {
                    newErrors.Location = 'Location is required';
                }
                break;

            case 2:
                if (!v.BrandId || v.BrandId <= 0) {
                    newErrors.BrandId = 'Brand is required';
                }
                if (!v.BrandModelId || v.BrandModelId <= 0) {
                    newErrors.BrandModelId = 'Model is required';
                }
                if (!v.FuelTypeId || v.FuelTypeId <= 0) {
                    newErrors.FuelTypeId = 'Fuel type is required';
                }
                if (!v.YearOfMfd || v.YearOfMfd < 1900 || v.YearOfMfd > new Date().getFullYear()) {
                    newErrors.YearOfMfd = 'Valid year is required';
                }
                if (!v.DrivenKm || v.DrivenKm <= 0) {
                    newErrors.DrivenKm = 'Kilometers driven is required';
                }
                if (!v.NoOfOwnersId || v.NoOfOwnersId <= 0) {
                    newErrors.NoOfOwnersId = 'Number of owners is required';
                }
                if (!v.TransmissionId || v.TransmissionId <= 0) {
                    newErrors.TransmissionId = 'Transmission is required';
                }
                break;

            case 3:
                if (!v.Price || v.Price <= 0) {
                    newErrors.Price = 'Price is required';
                }
                if (!payload.VehicleImages || payload.VehicleImages.length < 1) {
                    newErrors.VehicleImages = 'At least one image is required';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log('Submitting payload:', payload);
            // TODO: Implement actual submission
            // const result = await API.POST<VehicleAddEditResult>(Vehicle.ADDEDIT, payload);

            // For now, navigate back or show success
            navigation.goBack();
        } catch (error) {
            console.error('Failed to submit vehicle:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setCurrentStep(1);
        setPayload(initialData || defaultAddEdit());
        setErrors({});
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <VehicleStepHeader
                        currentStep={currentStep}
                        totalSteps={3}
                        stepTitle={getStepTitle(currentStep)}
                        nextStepTitle={getNextStepTitle(currentStep)}
                        onBack={handleBack}
                        onReset={handleReset}
                    />
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {currentStep === 1 && (
                    <VehicleStep1
                        data={payload.Vehicle}
                        vehicleTypes={vehicleTypeOptions}
                        lookingToOptions={lookingToOptions}
                        onChange={setVehicleField}
                        errors={errors}
                    />
                )}

                {currentStep === 2 && (
                    <VehicleStep2
                        data={payload.Vehicle}
                        brandOptions={brandOptions}
                        carTypeOptions={carTypeOptions}
                        fuelTypeOptions={fuelTypeOptions}
                        ownershipOptions={ownershipOptions}
                        transmissionOptions={transmissionOptions}
                        onChange={setVehicleField}
                        errors={errors}
                    />
                )}

                {currentStep === 3 && (
                    <VehicleStep3
                        data={payload.Vehicle}
                        onChange={setVehicleField}
                        images={payload.VehicleImages}
                        onImagesChange={handleImagesChange} // ✅ Use memoized callback
                        errors={errors}
                    />
                )}
            </ScrollView>

            {/* Footer with navigation buttons */}
            <View style={styles.footerContainer}>
                <VehicleFooter
                    currentStep={currentStep}
                    totalSteps={3}
                    onBack={handleBack}
                    onContinue={handleContinue}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    headerContainer: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Scale.SCALE_16,
        paddingBottom: Scale.SCALE_0,
        paddingTop: Scale.SCALE_8,
    },
    headerContent: {
        // Additional header styling if needed
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Scale.SCALE_16,
        paddingTop: Scale.SCALE_24,
    },
    footerContainer: {
        backgroundColor: Colors.WHITE,
        borderTopWidth: Scale.SCALE_1,
        borderTopColor: Colors.GRAY_100,
        paddingHorizontal: Scale.SCALE_16,
        paddingVertical: Scale.SCALE_16,
    },
});