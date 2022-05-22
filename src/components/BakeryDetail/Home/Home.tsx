import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useBakeryDetail } from '@/provider/BakeryDetailProvider';
import { BakeryDetailTabScreenProps } from '@/router';
import { Divider } from '../Divider';

const Home: React.FC<BakeryDetailTabScreenProps<'BakeryDetailHome'>> = ({ route }) => {
  const { bakery, updateBakery } = useBakeryDetail();

  React.useEffect(() => {
    updateBakery(route.params);
  }, [updateBakery, route.params]);

  return (
    <View style={styles.container}>
      <Divider />
      <Text>{bakery?.bakeryReviews[0].contents}</Text>
    </View>
  );
};

export { Home };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
