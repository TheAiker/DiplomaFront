import axios from 'axios';
import { TSendFeedbackResponse } from 'common/types';

export class FeedbackTransport {

    async sendFeedback(name: string, email: string, message: string): Promise<void> {
        await axios.post<TSendFeedbackResponse>('/api/feedback/send', { name, email, message });
    }

}

export const feedbackTransport = new FeedbackTransport();
