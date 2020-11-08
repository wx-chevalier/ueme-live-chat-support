import Chat, { Bubble, MessageProps, QuickReplyItemProps, useMessages } from '@chatui/core';
import cn from 'classnames';
import * as React from 'react';

import { IRoomProps } from '../../types';

import './index.css';

const prefix = 'live-consultation-room';

const defaultInitialMessages = [
  {
    type: 'text',
    content: { text: '主人好，我是智能助理，你的贴心小助手~' },
    user: {
      avatar:
        'https://ufc-assets.oss-cn-shanghai.aliyuncs.com/%E5%89%8D%E7%AB%AF%E8%B5%84%E6%BA%90/Logo/logo_%E7%95%99%E7%A9%BA.jpg'
    }
  },
  {
    type: 'image',
    content: {
      picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png'
    }
  }
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '人工服务'
  },
  {
    icon: 'keyboard',
    name: '更多操作'
  }
];

export interface LiveConsultationRoomProps extends IRoomProps {
  className?: string;
  style?: Record<string, string | number>;
}

export const LiveConsultationRoom = ({
  className,
  style,
  quickReplies = defaultQuickReplies,

  title = '智能助理',
  initialMessages = defaultInitialMessages,
  answerMessage,
  ...rest
}: LiveConsultationRoomProps) => {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      // 添加用户发送的消息
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      });

      setTyping(true);
    }

    // 获得回复的消息，然后添加
    (async () => {
      const replyMessage = await answerMessage({
        type: 'text',
        content: { text: val }
      });

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: replyMessage.type,
          content: replyMessage.content
        });
      }, 599);
    })();
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: QuickReplyItemProps) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <div className={cn(className, `${prefix}-container`)} style={style}>
      <Chat
        navbar={{ title }}
        messages={messages}
        quickReplies={quickReplies}
        onQuickReplyClick={handleQuickReplyClick}
        onSend={handleSend}
        renderMessageContent={renderMessageContent}
        {...rest}
      />
    </div>
  );
};
