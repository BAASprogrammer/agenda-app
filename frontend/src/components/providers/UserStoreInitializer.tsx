'use client';

import { useRef } from 'react';
import { useUserStore } from '@/store/userStore';
import { UserState } from '@/types/user-state';

export default function UserStoreInitializer(props: Partial<UserState>) {
    const initialized = useRef(false);
    // Initialize the store with the user data
    if (!initialized.current) {
        useUserStore.setState((state) => ({ ...state, ...props }));
        initialized.current = true;
    }

    return null;
}
