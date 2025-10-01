import {
    BadgePassThroughMethodOptions,
    BadgePassThroughOptions,
} from "primereact/badge";

const badgeDesignSystem: BadgePassThroughOptions = {
    root: ({ props }: BadgePassThroughMethodOptions) => ({
        className: `app-badge ${props.severity}`,
    }),
};

export default badgeDesignSystem;
