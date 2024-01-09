import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useGetBakery } from '@/apis/bakery';
import { BakeryInfoComponent } from '@/components/BakeryDetail/BakeryInfo/BakeryInfoComponent';
import {
  InfoDeliveryIcon,
  InfoIconProps,
  InfoParkingIcon,
  InfoPetIcon,
  InfoShippingIcon,
  InfoWifiIcon,
} from '@/components/Shared/Icons';
import { InfoBookingIcon } from '@/components/Shared/Icons/InfoBookingIcon';
import { BakeryDetailTabScreenProps } from '@/pages/MainStack/BakeryDetail';
import { useRoute } from '@react-navigation/native';

type FacilityCategory = 'PARKING' | 'WIFI' | 'DELIVERY' | 'PET' | 'SHIPPING' | 'BOOKING';
type FacilityText = '주차 가능' | '와이파이' | '배달' | '반려동물' | '택배' | '예약';

export type FacilityItem = {
  icon: React.FC<SvgProps & InfoIconProps>;
  category: FacilityCategory;
  text: FacilityText;
};

export const getFacilityText = (category: FacilityCategory): string => {
  switch (category) {
    case 'PARKING':
      return '주차 가능';
    case 'WIFI':
      return '와이파이';
    case 'DELIVERY':
      return '배달 가능';
    case 'PET':
      return '반려동물';
    case 'SHIPPING':
      return '택배 가능';
    case 'BOOKING':
      return '예약 가능';

    default:
      return '';
  }
};

const facilityList: FacilityItem[] = [
  {
    icon: InfoParkingIcon,
    category: 'PARKING',
    text: '주차 가능',
  },
  {
    icon: InfoWifiIcon,
    category: 'WIFI',
    text: '와이파이',
  },
  {
    icon: InfoDeliveryIcon,
    category: 'DELIVERY',
    text: '배달',
  },
  {
    icon: InfoPetIcon,
    category: 'PET',
    text: '반려동물',
  },
  {
    icon: InfoShippingIcon,
    category: 'SHIPPING',
    text: '택배',
  },
  {
    icon: InfoBookingIcon,
    category: 'BOOKING',
    text: '예약',
  },
];

export const BakeryInfoContainer = () => {
  const route = useRoute<BakeryDetailTabScreenProps<'BakeryDetailInfo'>['route']>();

  const { bakeryId } = route.params;
  const { bakery = null } = useGetBakery({ bakeryId });

  return <BakeryInfoComponent bakery={bakery} facilityList={facilityList} />;
};
