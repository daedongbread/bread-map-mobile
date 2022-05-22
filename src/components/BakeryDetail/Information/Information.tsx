import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';
import { theme } from '@/styles/theme';
import {
  ClockIcon,
  EarthIcon,
  FileTextIcon,
  InfoDeliveryIcon,
  InfoIconProps,
  InfoParkingIcon,
  InfoPetIcon,
  InfoShippingIcon,
  InfoWifiIcon,
  MapPinIcon,
  PhoneIcon,
} from '@shared/Icons';
import { Divider } from '../Divider';
import InfoRow from './InfoRow';

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

const Information: React.FC<BakeryDetailTabScreenProps<'BakeryDetailInfo'>> = () => {
  const { bakery } = useBakeryDetail();
  const [facilities, setFacilities] = React.useState<FacilityItem[] | null>(null);

  React.useEffect(() => {
    if (!bakery) {
      return;
    }
    const filtered = facilityList.filter(facility => bakery.bakeryInfo.basicInfoList.includes(facility.category));
    setFacilities(filtered);
  }, [bakery]);

  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.informationContainer}>
        <InfoRow icon={<MapPinIcon />} text={bakery?.bakeryInfo.address!} />
        <InfoRow icon={<ClockIcon />} text={bakery?.bakeryInfo.businessHour!} />
        <InfoRow icon={<EarthIcon />} text={bakery?.bakeryInfo.websiteUrlList[0]!} />
        <InfoRow icon={<PhoneIcon />} text={bakery?.bakeryInfo.telNumber!} />
        <TouchableOpacity style={styles.button}>
          <FileTextIcon />
          <Text style={styles.buttonText}>빵집 정보 수정하기</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.facilitiesContainer}>
        <Text style={styles.title}>시설정보</Text>
        <View style={styles.facilities}>
          {facilities?.map(facility => (
            <View style={styles.facility} key={facility.category}>
              {<facility.icon strokeColor={'orange'} />}
              <Text style={styles.facilityName}>{facility.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export { Information };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  informationContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.color.gray500,
    marginTop: 12,
  },
  buttonText: {
    color: theme.color.gray800,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  facilitiesContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color.black,
    marginVertical: 24,
  },
  facilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facility: {
    backgroundColor: theme.color.gray50,
    borderRadius: 10,
    width: '30%',
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
  },
  facilityName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.color.primary500,
  },
});
