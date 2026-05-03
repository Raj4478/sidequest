"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = Progress;
exports.ProgressTrack = ProgressTrack;
exports.ProgressIndicator = ProgressIndicator;
exports.ProgressLabel = ProgressLabel;
exports.ProgressValue = ProgressValue;
const progress_1 = require("@base-ui/react/progress");
const utils_1 = require("@/lib/utils");
function Progress({ className, children, value, ...props }) {
    return (<progress_1.Progress.Root value={value} data-slot="progress" className={(0, utils_1.cn)("flex flex-wrap gap-3", className)} {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </progress_1.Progress.Root>);
}
function ProgressTrack({ className, ...props }) {
    return (<progress_1.Progress.Track className={(0, utils_1.cn)("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", className)} data-slot="progress-track" {...props}/>);
}
function ProgressIndicator({ className, ...props }) {
    return (<progress_1.Progress.Indicator data-slot="progress-indicator" className={(0, utils_1.cn)("h-full bg-primary transition-all", className)} {...props}/>);
}
function ProgressLabel({ className, ...props }) {
    return (<progress_1.Progress.Label className={(0, utils_1.cn)("text-sm font-medium", className)} data-slot="progress-label" {...props}/>);
}
function ProgressValue({ className, ...props }) {
    return (<progress_1.Progress.Value className={(0, utils_1.cn)("ml-auto text-sm text-muted-foreground tabular-nums", className)} data-slot="progress-value" {...props}/>);
}
//# sourceMappingURL=progress.js.map