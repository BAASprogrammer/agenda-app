'use client';

import { useRef } from 'react';
import { useUserStore, UserState } from '@/store/userStore';

export default function UserStoreInitializer(props: Partial<UserState>) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useUserStore.setState((state) => ({ ...state, ...props }));
        initialized.current = true;
    }

    return null;
}
