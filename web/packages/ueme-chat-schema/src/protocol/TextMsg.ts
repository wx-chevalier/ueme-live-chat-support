import { MsgBase, MsgType } from './MsgBase';

export class TextMsg extends MsgBase {
  type: MsgType = 'text';

  // 消息内容
  msg: string;

  static createMsg(baseMsg: Partial<TextMsg>): TextMsg {
    const msg = new TextMsg();
    Object.assign(msg, baseMsg);
    return msg;
  }
}
