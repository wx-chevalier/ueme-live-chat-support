import { uuid } from '../utils/uuid';

export type MsgType = 'text' | 'media' | 'cmd' | 'attachment';

export type RoomType = 'single' | 'room';

export type GroupOption = {
  subject: string; // 群名称
  description: string; // 群简介
  members: string[]; // 成员列表
  optionsPublic: boolean; // 允许任何人加入
  optionsModerate: boolean; // 加入需审批
  optionsMembersOnly: boolean; // 不允许任何人主动加入
  optionsAllowInvites: boolean; // 允许群人员邀请
};

export class MsgBase {
  // 消息编号
  id: string = uuid();

  // 消息发送方，如果是从多个人发出，则用 , 逗号分隔
  from: string;

  // 消息接收方/目标方，如果是发送给多个人，则用 , 逗号分隔
  to: string;

  // 消息类型
  type: MsgType;

  // 聊天室类型
  roomType: RoomType;

  // 扩展消息
  ext: Record<string, string>;

  /** 校验当前消息是否有效 */
  isValid() {
    if (!this.from || !this.to) {
      return false;
    }

    return true;
  }

  static createMsg(baseMsg: Partial<MsgBase>): MsgBase {
    const msg = new MsgBase();
    Object.assign(msg, baseMsg);
    return msg;
  }
}
