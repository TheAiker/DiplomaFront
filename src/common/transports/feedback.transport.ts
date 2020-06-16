import axios from 'axios';
import { TSendFeedbackRequest, TSendFeedbackResponse } from 'common/types';
import { BaseTransport } from './base.transport';

export class FeedbackTransport extends BaseTransport {

    async sendFeedback(name: string, email: string, message: string): Promise<void> {
        await this.post<TSendFeedbackRequest, TSendFeedbackResponse>('/api/feedback/send', { name, email, message });
    }

}

export const feedbackTransport = new FeedbackTransport();
