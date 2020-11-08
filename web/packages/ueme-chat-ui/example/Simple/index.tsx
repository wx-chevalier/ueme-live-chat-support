import * as React from 'react';

import { LiveConsultationRoom } from '../../src';

export default function Simple() {
  return <LiveConsultationRoom answerMessage={async m => m} />;
}
