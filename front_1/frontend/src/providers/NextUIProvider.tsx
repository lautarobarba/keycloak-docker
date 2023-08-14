'use client'
import { ReactNode } from 'react';
import { NextUIProvider as NextUIProviderOriginal } from '@nextui-org/react'

type NextUIProviderProps = {
    children?: ReactNode;
};

export const NextUIProvider = (props: NextUIProviderProps) => {
    const { children } = props;
    return (
        <NextUIProviderOriginal>
            {children}
        </NextUIProviderOriginal>
    )
}
