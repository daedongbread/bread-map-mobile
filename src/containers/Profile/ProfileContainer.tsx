import React, { useState } from 'react';
import { ProfileComponent } from '@/components/Profile';

//로직
export function ProfileContainer() {
  const [buttonType, setButtonType] = useState(0);
  return <ProfileComponent buttonType={buttonType} setButtonType={setButtonType} />;
}
