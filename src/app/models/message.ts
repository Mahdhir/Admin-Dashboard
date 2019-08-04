export interface Message {
    id: number;
    Sender: string;
    ReceiverEmail: string;
    Message: string;
    isUnRead: boolean;
    TimeSent: Date;

}
