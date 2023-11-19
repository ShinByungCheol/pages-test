import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
export const CategoryScreen = ({ navigation, route }) => {
  const {
    category,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;

  // 투표 게시글 받아오기
  useEffect(() => {
    const categoryData = async () => {
      console.log(category);
      try {
        const response = await axios.get(
          'https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/polls/category/',
          category
        );

        if (response.status === 200) {
          console.log('카테고리', response.data);
        } else {
          console.error(
            'Failed to fetch votes:',
            response.data
          );
        }
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };
    // Call the fetchData function to fetch votes when the component mounts
    categoryData();
  }, [category]);

  return (
    <View style={styles.main_page}>
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
            {route.params.category}
          </Text>
        </View>
        <View style={styles.standard_view}>
          <Text style={styles.standard_text}>정렬기준</Text>
        </View>
      </View>
      <View style={styles.category_post_view}>
        <View style={styles.category_post_box}>
          <View style={styles.category_post_text}>
            <Text style={styles.category_post_title}>
              제목은 이렇게 들어갈 예정
            </Text>
            <Text style={styles.category_post_sub}>
              본문은 아래에 동일한 라인으로 폰트사이즘나
              축소 최대 두줄 가능함, 두 줄 이상일 시 짤려서
              나타나도록 할 예정
            </Text>
          </View>
          <View style={styles.category_post_like}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.category_post_like_text}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
