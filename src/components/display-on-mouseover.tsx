import React, { useState } from 'react'

interface MouseEnterLeave {
    "onMouseEnter": (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    "onMouseLeave": () => void;
}

export interface DisplayOnMouseOverProps {
    children: (isActive: boolean, props: MouseEnterLeave) => JSX.Element
    activeByDefault?: boolean
}

export function DisplayOnMouseOver({ children, activeByDefault = false }: DisplayOnMouseOverProps) {
    const [isActive, setActive] = useState(activeByDefault);
    const activate = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setActive(true)
    };

    const deactivate = () => {
        setActive(false)
    };

    return children(isActive, {
        "onMouseEnter": activate,
        "onMouseLeave": deactivate,
    })
}