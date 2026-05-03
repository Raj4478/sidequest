"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderTemplate = exports.welcomeTemplate = void 0;
const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; padding: 40px; }
  .logo { font-size: 24px; font-weight: 800; color: #6c47ff; margin-bottom: 24px; }
  h1 { font-size: 22px; color: #1a1a2e; margin: 0 0 12px; }
  p { color: #555; line-height: 1.6; }
  .btn { display: inline-block; background: #6c47ff; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
  .footer { margin-top: 32px; font-size: 12px; color: #999; }
</style></head>
<body>
  <div class="container">
    <div class="logo">SideQuest</div>
    <h1>Welcome, ${name}! 🎯</h1>
    <p>You've just taken the first step toward making this year count. SideQuest is here to help you stay focused on what matters most.</p>
    <p>Set your one big resolution, break it into milestones, and check in regularly. Simple, powerful, and built around how you actually grow.</p>
    <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">Start Your Quest →</a>
    <div class="footer">You're receiving this because you just created a SideQuest account.</div>
  </div>
</body>
</html>
`;
exports.welcomeTemplate = welcomeTemplate;
const reminderTemplate = (name, resolutionTitle, milestoneTitle, dueDate) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 12px; padding: 40px; }
  .logo { font-size: 24px; font-weight: 800; color: #6c47ff; margin-bottom: 24px; }
  .badge { display: inline-block; background: #ede9fe; color: #6c47ff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
  h1 { font-size: 20px; color: #1a1a2e; margin: 0 0 12px; }
  p { color: #555; line-height: 1.6; }
  .milestone-box { background: #f5f3ff; border-left: 4px solid #6c47ff; padding: 16px; border-radius: 0 8px 8px 0; margin: 20px 0; }
  .milestone-box strong { color: #1a1a2e; }
  .milestone-box span { font-size: 13px; color: #888; }
  .btn { display: inline-block; background: #6c47ff; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 8px; }
  .footer { margin-top: 32px; font-size: 12px; color: #999; }
</style></head>
<body>
  <div class="container">
    <div class="logo">SideQuest</div>
    <div class="badge">Weekly Check-in</div>
    <h1>Hey ${name}, time to check in 👋</h1>
    <p>Your quest <strong>${resolutionTitle}</strong> is ongoing. Here's your upcoming milestone:</p>
    <div class="milestone-box">
      <strong>${milestoneTitle}</strong><br/>
      <span>Due: ${dueDate}</span>
    </div>
    <p>How's it going? Add a quick reflection to track your wins and blockers.</p>
    <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">View My Quest →</a>
    <div class="footer">You're receiving this because you have reminders enabled on SideQuest.</div>
  </div>
</body>
</html>
`;
exports.reminderTemplate = reminderTemplate;
//# sourceMappingURL=email.templates.js.map