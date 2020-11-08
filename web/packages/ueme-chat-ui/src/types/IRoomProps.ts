import { ChatProps, MessageProps } from '@chatui/core';

type MessageWithoutId = Omit<MessageProps, '_id'>;

export interface IRoomProps extends Partial<ChatProps> {
  title?: string;
  initialMessages?: MessageWithoutId[];

  /** 针对消息进行回复 */
  answerMessage: (message: MessageWithoutId) => Promise<MessageWithoutId>;
}
