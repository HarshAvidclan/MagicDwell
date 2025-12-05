// src/contexts/PostListingModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PostListingModalContextType {
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const PostListingModalContext = createContext<PostListingModalContextType | undefined>(undefined);

interface PostListingModalProviderProps {
    children: ReactNode;
}

export const PostListingModalProvider: React.FC<PostListingModalProviderProps> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => setIsVisible(true);
    const closeModal = () => setIsVisible(false);

    return (
        <PostListingModalContext.Provider value={{ isVisible, openModal, closeModal }}>
            {children}
        </PostListingModalContext.Provider>
    );
};

export const usePostListingModal = () => {
    const context = useContext(PostListingModalContext);
    if (!context) {
        throw new Error('usePostListingModal must be used within PostListingModalProvider');
    }
    return context;
};