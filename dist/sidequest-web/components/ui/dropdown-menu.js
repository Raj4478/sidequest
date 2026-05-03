"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
const React = __importStar(require("react"));
const menu_1 = require("@base-ui/react/menu");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
function DropdownMenu({ ...props }) {
    return <menu_1.Menu.Root data-slot="dropdown-menu" {...props}/>;
}
function DropdownMenuPortal({ ...props }) {
    return <menu_1.Menu.Portal data-slot="dropdown-menu-portal" {...props}/>;
}
function DropdownMenuTrigger({ ...props }) {
    return <menu_1.Menu.Trigger data-slot="dropdown-menu-trigger" {...props}/>;
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
    return (<menu_1.Menu.Portal>
      <menu_1.Menu.Positioner className="isolate z-50 outline-none" align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset}>
        <menu_1.Menu.Popup data-slot="dropdown-menu-content" className={(0, utils_1.cn)("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className)} {...props}/>
      </menu_1.Menu.Positioner>
    </menu_1.Menu.Portal>);
}
function DropdownMenuGroup({ ...props }) {
    return <menu_1.Menu.Group data-slot="dropdown-menu-group" {...props}/>;
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return (<menu_1.Menu.GroupLabel data-slot="dropdown-menu-label" data-inset={inset} className={(0, utils_1.cn)("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)} {...props}/>);
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
    return (<menu_1.Menu.Item data-slot="dropdown-menu-item" data-inset={inset} data-variant={variant} className={(0, utils_1.cn)("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className)} {...props}/>);
}
function DropdownMenuSub({ ...props }) {
    return <menu_1.Menu.SubmenuRoot data-slot="dropdown-menu-sub" {...props}/>;
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (<menu_1.Menu.SubmenuTrigger data-slot="dropdown-menu-sub-trigger" data-inset={inset} className={(0, utils_1.cn)("flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)} {...props}>
      {children}
      <lucide_react_1.ChevronRightIcon className="ml-auto"/>
    </menu_1.Menu.SubmenuTrigger>);
}
function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }) {
    return (<DropdownMenuContent data-slot="dropdown-menu-sub-content" className={(0, utils_1.cn)("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)} align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} {...props}/>);
}
function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }) {
    return (<menu_1.Menu.CheckboxItem data-slot="dropdown-menu-checkbox-item" data-inset={inset} className={(0, utils_1.cn)("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)} checked={checked} {...props}>
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-checkbox-item-indicator">
        <menu_1.Menu.CheckboxItemIndicator>
          <lucide_react_1.CheckIcon />
        </menu_1.Menu.CheckboxItemIndicator>
      </span>
      {children}
    </menu_1.Menu.CheckboxItem>);
}
function DropdownMenuRadioGroup({ ...props }) {
    return (<menu_1.Menu.RadioGroup data-slot="dropdown-menu-radio-group" {...props}/>);
}
function DropdownMenuRadioItem({ className, children, inset, ...props }) {
    return (<menu_1.Menu.RadioItem data-slot="dropdown-menu-radio-item" data-inset={inset} className={(0, utils_1.cn)("relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)} {...props}>
      <span className="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-radio-item-indicator">
        <menu_1.Menu.RadioItemIndicator>
          <lucide_react_1.CheckIcon />
        </menu_1.Menu.RadioItemIndicator>
      </span>
      {children}
    </menu_1.Menu.RadioItem>);
}
function DropdownMenuSeparator({ className, ...props }) {
    return (<menu_1.Menu.Separator data-slot="dropdown-menu-separator" className={(0, utils_1.cn)("-mx-1 my-1 h-px bg-border", className)} {...props}/>);
}
function DropdownMenuShortcut({ className, ...props }) {
    return (<span data-slot="dropdown-menu-shortcut" className={(0, utils_1.cn)("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", className)} {...props}/>);
}
//# sourceMappingURL=dropdown-menu.js.map