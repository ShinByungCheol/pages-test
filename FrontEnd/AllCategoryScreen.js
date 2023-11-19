import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles, SCREEN_WIDTH } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
export const AllCategoryScreen = ({
  navigation,
  route,
}) => {
  const { categories } = route.params;
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  // 이 부분에 상수 정의

  const titles = [
    '정치 이대로 괜찮을까?',
    '공기밥 가격 2000원 실화..?',
    '해외 축구는 여기로!',
    '현대 미술과 문화',
    '사회 문제는 여기로!',
    '게임 같이 할 사람!',
    '난 고양이 키우는데 너는?',
    '어떤 음식이 최고야?',
  ];
  return (
    <View>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeScreen', {
                isLoggedIn: true,
                userId,
                jwtToken,
                nickname,
                updateDM2,
              })
            }
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.back_title_view}>
          <Text style={styles.back_text}>
            모든 카테고리
          </Text>
        </View>
      </View>
      <View style={styles.AllCategory_View}>
        <View style={styles.Allcategory_category_View}>
          {categories.map((category, index) => (
            <View
              key={category}
              style={styles.Allcategory_category_text_view}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryScreen', {
                    isLoggedIn: true,
                    userId,
                    jwtToken,
                    nickname,
                    updateDM2,
                    category,
                  })
                }
              >
                <View style={styles.main_Row}>
                  <MaterialIcons
                    name="category"
                    size={24}
                    color="black"
                  />
                  <Text
                    style={styles.Allcategory_category_text}
                  >
                    {category}
                  </Text>
                </View>
                <Text style={styles.Allcategory_title_text}>
                  {titles[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
