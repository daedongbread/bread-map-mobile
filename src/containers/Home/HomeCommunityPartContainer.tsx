import React from 'react';
import { HomeCommunityPartComponent } from '@/components/Home/HomeCommunityPart';

export const HomeCommunityPartContainer = () => {
  const onPressMore = () => {
    // console.log('click');
  };

  return <HomeCommunityPartComponent onPressMore={onPressMore} />;
};
