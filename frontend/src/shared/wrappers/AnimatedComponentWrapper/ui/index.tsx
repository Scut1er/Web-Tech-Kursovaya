import { useEffect, useState } from "react";
import { DEFAULT_FADE_DURATION } from "@utils/constants";
import "./style.css";

interface AnimatedComponentWrapperProps {
    isVisible: boolean;
    animationType?: ComponentAnimationsTypes;
    zIndex?: number;
    children: React.ReactNode;
}

const DEFAULT_Z_INDEX: number = 50;

export const enum ComponentAnimationsTypes {
    FADE = "content-fade",
    FADE_EXPAND = "content-fade-expand",
    FADE_BLUR = "content-fade-blur",
}

const AnimatedComponentWrapper = ({
    isVisible,
    zIndex = DEFAULT_Z_INDEX,
    animationType = ComponentAnimationsTypes.FADE,
    children,
}: AnimatedComponentWrapperProps) => {
    const [shouldRender, setShouldRender] = useState(isVisible);
    const [animationClass, setAnimationClass] = useState(
        `${animationType}-enter`
    );

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            setAnimationClass(`${animationType}-enter`);

            return;
        }

        setAnimationClass(`${animationType}-exit`);

        const animationTimeout = setTimeout(() => {
            setShouldRender(false);
        }, DEFAULT_FADE_DURATION);

        return () => clearTimeout(animationTimeout);
    }, [isVisible, animationType]);

    if (!shouldRender) return null;

    return (
        <div style={{ zIndex }} className={animationClass}>
            {children}
        </div>
    );
};

export default AnimatedComponentWrapper;
