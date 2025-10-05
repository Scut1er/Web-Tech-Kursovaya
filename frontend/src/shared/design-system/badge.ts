import {
    BadgePassThroughMethodOptions,
    BadgePassThroughOptions,
} from "primereact/badge";

const badgeDesignSystem: BadgePassThroughOptions = {
    root: ({ props }: BadgePassThroughMethodOptions) => ({
        className: `app-badge typography-body ${props?.className || ""}`,
    }),
};

export default badgeDesignSystem;
