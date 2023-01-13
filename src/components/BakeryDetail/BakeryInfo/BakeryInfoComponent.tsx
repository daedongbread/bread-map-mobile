import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BakerySingleEntity } from '@/apis/bakery/types';
import { Text } from '@/components/Shared/Text';
import { FacilityItem } from '@/containers/BakeryDetail/BakeryInfo/BakeryInfoContainer';
import { theme } from '@/styles/theme';
import { Divider } from '../Divider';

type Props = {
  bakery: BakerySingleEntity | null;
  facilityList: FacilityItem[];
};

export const BakeryInfoComponent = ({ bakery, facilityList }: Props) => {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.facilitiesContainer}>
        <Text style={styles.title}>시설정보</Text>
        <View style={styles.facilities}>
          {facilityList.map(facility => (
            <View style={styles.facility} key={facility.category}>
              {<facility.icon strokeColor={bakery?.facilityInfoList.includes(facility.category) ? 'orange' : 'gray'} />}
              <Text
                style={
                  facilityNameStyle(bakery?.facilityInfoList.includes(facility.category) ? 'primary500' : 'gray500')
                    .facilityName
                }
              >
                {facility.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const facilityNameStyle = (colorKey: keyof typeof theme.color) =>
  StyleSheet.create({
    facilityName: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.color[colorKey],
    },
  });

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
});
