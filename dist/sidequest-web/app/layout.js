"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const sonner_1 = require("@/components/ui/sonner");
exports.metadata = {
    title: 'SideQuest — One Goal. One Year.',
    description: 'Set one meaningful resolution, break it into milestones, and stay accountable.',
};
function RootLayout({ children }) {
    return (<html lang="en">
      <body>
        {children}
        <sonner_1.Toaster theme="dark" position="bottom-right"/>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map