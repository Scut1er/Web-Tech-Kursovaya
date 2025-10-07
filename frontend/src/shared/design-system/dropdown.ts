import { DropdownPassThroughOptions } from "primereact/dropdown";

const dropdownDesignSystem: DropdownPassThroughOptions = {
    root: {
        className: `app-dropdown-root`,
    },
    input: {
        className: `app-dropdown-input`,
    },
    trigger: {
        className: `app-dropdown-trigger`,
    },
    panel: {
        className: `app-dropdown-panel`,
    },
    item: {
        className: `app-dropdown-item`,
    },
    itemGroup: {
        className: `app-dropdown-item-group`,
    },
    emptyMessage: {
        className: `app-dropdown-empty-message typography-caption`,
    },
    filterInput: {
        className: `app-dropdown-filter-input`,
    },
    clearIcon: {
        className: `app-dropdown-clear-icon`,
    },
};

export default dropdownDesignSystem;
