import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';
import type { InfoIconProps } from '@shared/Icons';
import { InfoParkingIcon, InfoWifiIcon, InfoDeliveryIcon, InfoPetIcon, InfoShippingIcon } from '@shared/Icons';

type FacilityCategory = 'PARKING' | 'WIFI' | 'DELIVERY' | 'PET' | 'SHIPPING';
type FacilityText = '주차 가능' | '와이파이' | '배달' | '반려동물' | '택배';

type FacilityItem = {
  icon: React.FC<SvgProps & InfoIconProps>;
  category: FacilityCategory;
  text: FacilityText;
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
];

export const useInfoSection = ({ route }: BakeryDetailTabScreenProps<'BakeryDetailInfo'>) => {
  const { bakery } = useBakeryDetail();
  const [facilities, setFacilities] = React.useState<FacilityItem[] | null>(null);

  React.useEffect(() => {
    const filtered = facilityList.filter(facility => bakery?.bakeryInfo.basicInfoList?.includes(facility.category));
    setFacilities(filtered);
  }, [bakery]);

  return {
    bakeryInfo: bakery?.bakeryInfo!,
    facilities,
  };
};
