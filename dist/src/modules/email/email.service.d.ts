import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private resend;
    private fromEmail;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<void>;
}
