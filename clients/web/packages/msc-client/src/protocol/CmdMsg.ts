import { MsgBase, MsgType } from './MsgBase';

export class CmdMsg extends MsgBase {
  type: MsgType = 'cmd';

  // 消息内容
  msg: string;
  // 命令
  action: string;

  static createMsg(baseMsg: Partial<CmdMsg>): CmdMsg {
    const msg = new CmdMsg();
    Object.assign(msg, baseMsg);
    return msg;
  }
}
