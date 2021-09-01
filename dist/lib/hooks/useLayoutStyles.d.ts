import React from 'react';
declare const properties: {
    readonly p: "padding";
    readonly py: readonly ["paddingTop", "paddingBottom"];
    readonly px: readonly ["paddingLeft", "paddingRight"];
    readonly pt: "paddingTop";
    readonly pr: "paddingRight";
    readonly pb: "paddingBottom";
    readonly pl: "paddingLeft";
    readonly m: "margin";
    readonly mx: readonly ["marginRight", "marginLeft"];
    readonly my: readonly ["marginTop", "marginBottom"];
    readonly mt: "marginTop";
    readonly mr: "marginRight";
    readonly mb: "marginBottom";
    readonly ml: "marginLeft";
    readonly h: "height";
    readonly w: "width";
    readonly size: readonly ["height", "width"];
    readonly round: "borderRadius";
};
declare type LayoutValue = number | string;
declare type LayoutProps = Record<keyof typeof properties, LayoutValue> & React.CSSProperties & {
    style: React.CSSProperties;
    className: string;
};
export declare type LayoutComponentProps = React.PropsWithChildren<Partial<LayoutProps>>;
declare const _default: (props: LayoutComponentProps, componentStyle: React.CSSProperties) => React.CSSProperties & Partial<LayoutComponentProps>;
export default _default;
