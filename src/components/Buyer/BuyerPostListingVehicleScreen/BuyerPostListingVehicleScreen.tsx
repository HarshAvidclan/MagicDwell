// src/components/Buyer/BuyerPostListingVehicleScreen/BuyerPostListingVehicleScreen.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectionOption } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { BuyerPostListingVehicleNavigationProp, Routes } from '../../../Types/Navigation';
import { Colors, Scale, Strings } from '../../Constants';
import { VehicleStep1 } from './VehicleStep1/VehicleStep1';
import { VehicleStep2 } from './VehicleStep2/VehicleStep2';
import { VehicleStep3 } from './VehicleStep3/VehicleStep3';
import { PostListingStepHeader } from '../PostListingStepHeader/PostListingStepHeader'; // ✅ Shared component
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
    VehicleAddEditResult, // ✅ Add this
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
    VehicleTypeId: 1,
    ChildVehicleTypeId: 0,
    LookingToId: 0,
    BrandId: 0,
    BrandModelId: 0,
    FuelTypeId: 0,
    YearOfMfd: 0,
    DrivenKm: 0,
    NoOfOwnersId: 0,
    TransmissionId: 0,
    Location: '',
    PlaceId: '',
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
    postId = 1068,
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

    const setVehicleField = useCallback(<K extends keyof tbl_Vehicle>(
        field: K,
        value: tbl_Vehicle[K],
    ) => {
        setPayload((p) => ({ ...p, Vehicle: { ...p.Vehicle, [field]: value } }));
        setErrors((prev) => {
            const clone = { ...prev };
            delete clone[String(field)];
            return clone;
        });
    }, []);

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

    // ✅ Filter child vehicle types based on current VehicleTypeId
    const childVehicleTypeOptions: SelectionOption[] = useMemo(
        () =>
            (masterData?.lstChildVehicleType || []).map((ct) => ({
                value: ct.VehicleTypeId,
                label: ct.VehicleTypeName,
            })),
        [masterData, payload.Vehicle.VehicleTypeId], // ✅ Re-filter when VehicleTypeId changes
    );
    // Step titles
    const getStepTitle = (step: number): string => {
        switch (step) {
            case 1:
                return Strings.VEHICLE_LISTING.STEP_1_TITLE;
            case 2:
                return Strings.VEHICLE_LISTING.STEP_2_TITLE;
            case 3:
                return Strings.VEHICLE_LISTING.STEP_3_TITLE;
            default:
                return '';
        }
    };

    const getNextStepTitle = (step: number): string | null => {
        switch (step) {
            case 1:
                return Strings.VEHICLE_LISTING.STEP_1_SUBTITLE;
            case 2:
                return Strings.VEHICLE_LISTING.STEP_2_SUBTITLE;
            case 3:
                return Strings.VEHICLE_LISTING.STEP_3_SUBTITLE;
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
                handlePublish();
            }
        }
    };

    // Validation
    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<string, string>> = {};
        const v = payload.Vehicle;

        switch (step) {
            case 1:
                if (!v.VehicleTypeId || v.VehicleTypeId <= 0) {
                    newErrors.VehicleTypeId = Strings.VEHICLE_LISTING.VEHICLE_TYPE_REQUIRED;
                }
                if (!v.LookingToId || v.LookingToId <= 0) {
                    newErrors.LookingToId = Strings.VEHICLE_LISTING.LOOKING_TO_REQUIRED;
                }
                if (!v.Location || v.Location.trim() === '') {
                    newErrors.Location = Strings.VEHICLE_LISTING.LOCATION_REQUIRED;
                }
                break;

            case 2:
                if (!v.BrandId || v.BrandId <= 0) {
                    newErrors.BrandId = Strings.VEHICLE_LISTING.BRAND_REQUIRED;
                }
                if (!v.BrandModelId || v.BrandModelId <= 0) {
                    newErrors.BrandModelId = Strings.VEHICLE_LISTING.MODEL_REQUIRED;
                }
                if (childVehicleTypeOptions.length > 0 && (!v.ChildVehicleTypeId || v.ChildVehicleTypeId <= 0)) {
                    newErrors.ChildVehicleTypeId = 'Vehicle category is required';
                }
                if (!v.FuelTypeId || v.FuelTypeId <= 0) {
                    newErrors.FuelTypeId = Strings.VEHICLE_LISTING.FUEL_TYPE_REQUIRED;
                }
                if (!v.YearOfMfd || v.YearOfMfd < 1900 || v.YearOfMfd > new Date().getFullYear()) {
                    newErrors.YearOfMfd = Strings.VEHICLE_LISTING.YEAR_REQUIRED;
                }
                if (!v.DrivenKm || v.DrivenKm <= 0) {
                    newErrors.DrivenKm = Strings.VEHICLE_LISTING.KM_DRIVEN_REQUIRED;
                }
                if (!v.NoOfOwnersId || v.NoOfOwnersId <= 0) {
                    newErrors.NoOfOwnersId = Strings.VEHICLE_LISTING.OWNERSHIP_REQUIRED;
                }
                if (!v.TransmissionId || v.TransmissionId <= 0) {
                    newErrors.TransmissionId = Strings.VEHICLE_LISTING.TRANSMISSION_REQUIRED;
                }
                break;

            case 3:
                if (!v.Price || v.Price <= 0) {
                    newErrors.Price = Strings.VEHICLE_LISTING.PRICE_REQUIRED;
                }
                if (!payload.VehicleImages || payload.VehicleImages.length < 1) {
                    newErrors.VehicleImages = Strings.VEHICLE_LISTING.IMAGES_REQUIRED;
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Publish Handler (Similar to Property)
    const handlePublish = async () => {
        if (!payload) return;

        setIsLoading(true);
        try {
            console.log('Publishing vehicle listing...', JSON.stringify(payload));

            const res = await API.POST<VehicleAddEditResult>(
                Vehicle.ADDEDIT,
                payload,
            );

            const postId = payload?.Post?.PostId;

            if (res != null) {
                console.log('Vehicle Save Response', res);

                if (res.IsSuccess && (Number(postId) <= 0 || postId === undefined)) {
                    Alert.alert('Success', 'Vehicle listed successfully!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate(Routes.BUYER_TABS);
                            },
                        },
                    ]);
                } else if (res.IsSuccess) {
                    Alert.alert('Success', 'Vehicle details updated!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate(Routes.BUYER_TABS);
                            },
                        },
                    ]);
                } else {
                    Alert.alert('Error', 'Failed to publish vehicle listing.');
                }
            }
        } catch (error) {
            console.error('Publish error:', error);
            Alert.alert('Error', 'Failed to publish listing. Please try again.');
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
                    {/* ✅ Use Shared Header Component */}
                    <PostListingStepHeader
                        currentStep={currentStep}
                        totalSteps={3}
                        stepTitle={getStepTitle(currentStep)}
                        nextStepTitle={getNextStepTitle(currentStep)}
                        onBack={handleBack}
                        onReset={handleReset}
                        screenTitle={Strings.VEHICLE_LISTING.POST_VEHICLE}
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
                        childVehicleTypeOptions={childVehicleTypeOptions}
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
                        onImagesChange={handleImagesChange}
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