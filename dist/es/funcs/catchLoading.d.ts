import React from "react";
export declare function catchLoading<P extends object>(BaseComponent: React.FunctionComponent<P>): React.FunctionComponent<P>;
export declare function useCatchLoadingDeps(...depends: boolean[]): void;
export declare function useCatchLoading(): boolean;
