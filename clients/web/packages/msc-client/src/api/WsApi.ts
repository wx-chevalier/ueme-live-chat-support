import { MsgBase, GroupOption } from '../protocol/MsgBase';
import { CmdMsg } from '../protocol/CmdMsg';

/** WebSocket Api */
export class WsApi {
  // 保存公共的状态信息
  token: string;
  from: string;

  async sendMsg(msg: Partial<MsgBase>) {
    console.log(msg);
  }

  /** @start 好友管理 */
  // 通用查询
  async sendGetCmdMsg(action: string, extra: {} = {}) {
    const msg = CmdMsg.createMsg({ from: this.from, action, ...extra });

    return this.sendMsg(msg);
  }

  // 通用操作
  async sendPostCmdMsg(action: string, userIds: string[] | null, extra: {} = {}) {
    const msg = CmdMsg.createMsg({
      from: this.from,
      to: (userIds || []).join(','),
      action,
      ...extra
    });

    return this.sendMsg(msg);
  }

  // 查询好友列表
  getRoster() {
    return this.sendGetCmdMsg('getRoster');
  }

  // 添加好友
  addFriends(userIds: string[]) {
    return this.sendPostCmdMsg('addFriends', userIds);
  }

  // 同意好友请求
  agreeFriends(userIds: string[]) {
    return this.sendPostCmdMsg('agreeFriends', userIds);
  }

  // 拒绝好友请求
  rejectFriends(userIds: string[]) {
    return this.sendPostCmdMsg('rejectFriends', userIds);
  }

  // 移除
  removeFriends(userIds: string[]) {
    return this.sendPostCmdMsg('removeFriends', userIds);
  }

  // 获取黑名单列表
  getBlacklist() {
    return this.sendGetCmdMsg('getBlacklist');
  }

  // 加入黑名单
  addToBlackList(userIds: string[]) {
    return this.sendPostCmdMsg('addToBlackList', userIds);
  }

  // 移出黑名单
  removeBlackList(userIds: string[]) {
    return this.sendPostCmdMsg('removeBlackList', userIds);
  }

  /** @end 好友管理 */

  /** @start 群组管理 */
  // 列出所有的群组
  listGroups() {
    return this.sendGetCmdMsg('listGroups');
  }

  // 获取群组信息
  queryGroupInfo(roomId: string) {
    return this.sendGetCmdMsg('queryGroupInfo', { to: roomId });
  }

  // 查询群组的成员
  queryRoomMember(roomId: string) {
    return this.sendGetCmdMsg('queryRoomMember', { to: roomId });
  }

  // 获取群组黑名单
  getGroupBlackList(roomId: string) {
    return this.sendGetCmdMsg('getGroupBlackList', { to: roomId });
  }

  // 建立群组
  createGroup(groupOption: GroupOption) {
    return this.sendPostCmdMsg('createGroup', null, { ext: groupOption });
  }

  // 更新群组
  changeGroupInfo(groupOption: GroupOption) {
    return this.sendPostCmdMsg('changeGroupInfo', null, { ext: groupOption });
  }

  // 将好友加入群组
  addGroupMembers(roomId: string, userIds: string[]) {
    return this.sendPostCmdMsg('addGroupMembers', [roomId], {
      ext: {
        members: userIds
      }
    });
  }

  // 将成员踢出群组
  addToGroupBlackList(roomId: string, userIds: string[]) {
    return this.sendPostCmdMsg('addToGroupBlackList', [roomId], {
      ext: {
        members: userIds
      }
    });
  }

  // 解散群组
  destroyGroup(roomId: string) {
    return this.sendPostCmdMsg('destroyGroup', [roomId]);
  }

  // 退出群组
  leaveGroup(roomId: string) {
    return this.sendPostCmdMsg('leaveGroup', [roomId]);
  }

  /** @end 群组管理 */
  // 创建聊天室群组
  createRoom(groupOption: GroupOption) {
    return this.sendPostCmdMsg('createGroup', null, { ext: groupOption });
  }

  // 列出所有的聊天室
  listRooms() {
    return this.sendGetCmdMsg('listRooms');
  }

  // 退出聊天室
  joinRoom(roomId: string) {
    return this.sendPostCmdMsg('joinRoom', [roomId]);
  }

  // 退出聊天室
  quitRoom(roomId: string) {
    return this.sendPostCmdMsg('quitRoom', [roomId]);
  }

  /** @start 聊天室管理 */
  /** @end 聊天室管理 */
}
