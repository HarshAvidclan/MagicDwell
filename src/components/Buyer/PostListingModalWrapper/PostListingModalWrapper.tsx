// src/components/Buyer/PostListingModalWrapper/PostListingModalWrapper.tsx
import React from 'react';
import { usePostListingModal } from '../../../contexts/PostListingModalContext';
import { CommonModal } from '../../Common';
import { PostListingSelection } from '../PostListingSelection/PostListingSelection';

export const PostListingModalWrapper: React.FC = () => {
    const { isVisible, closeModal } = usePostListingModal();

    return (
        <CommonModal
            visible={isVisible}
            onClose={closeModal}
            showHomeIndicator
        >
            <PostListingSelection />
        </CommonModal>
    );
};