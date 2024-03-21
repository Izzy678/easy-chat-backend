export class CreateChatDTo {
  ids: Array<string>;
  message: string;
  chatroomId: string;
}

export class SendChatDto {
  message: string;
  sender: string;
  chatroomId: string;
}
