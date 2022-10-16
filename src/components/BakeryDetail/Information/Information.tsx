import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { theme } from '@/styles/theme';
import {
  InfoDeliveryIcon,
  InfoIconProps,
  InfoParkingIcon,
  InfoPetIcon,
  InfoShippingIcon,
  InfoWifiIcon,
} from '@shared/Icons';
import { Divider } from '../Divider';

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

const Information: React.FC = () => {
  const { bakery } = useBakeryDetail();
  const [facilities, setFacilities] = React.useState<FacilityItem[] | null>(null);

  React.useEffect(() => {
    if (!bakery) {
      return;
    }
    const filtered = facilityList.filter(facility => bakery.facilityInfoList.includes(facility.category));
    setFacilities(filtered);
  }, [bakery]);

  return (
    <View style={styles.container}>
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
    marginTop: 32,
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
