export interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        logprobs: null | any; // Assuming `logprobs` can be null or an object, refine as needed
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        prompt_time: number;
        completion_tokens: number;
        completion_time: number;
        total_tokens: number;
        total_time: number;
    };
    system_fingerprint: string;
    x_groq: {
        id: string;
    };
}