export type TServerResponse<T> = {
    success: boolean;
    data: T;
    error?: string;
};

export type TImage = {
    id: number;
    hash: string;
}
