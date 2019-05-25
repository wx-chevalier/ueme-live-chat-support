import { MsgBase, MsgType } from './MsgBase';

export class MediaMsg extends MsgBase {
  type: MsgType = 'media';

  // 消息内容
  file: { data: Blob | null; url: string };

  // 创建消息
  static createMsg(baseMsg: Partial<MediaMsg>): MediaMsg {
    const msg = new MediaMsg();
    Object.assign(msg, baseMsg);
    return msg;
  }

  // 从剪贴板中创建
  static createFromClipboard(baseMsg: Partial<MediaMsg>, clipboardData: DataTransfer) {
    if (clipboardData && clipboardData.types) {
      if (clipboardData.items.length > 0) {
        const blob = clipboardData.items[0].getAsFile();
        const url = window.URL.createObjectURL(blob);

        return MediaMsg.createMsg({
          ...baseMsg,
          file: {
            data: blob,
            url
          }
        });
      }
    }

    return null;
  }
}
