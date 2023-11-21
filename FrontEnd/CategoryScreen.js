import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import React from 'react';

export const CategoryScreen = ({ navigation, route }) => {
  const {
    category,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
    filteredVotes,
  } = route.params;
  const handleGoBack = () => {
    // navigation.goBack()을 호출하여 이전 화면으로 이동
    navigation.goBack();
  };
  return (
    <View style={styles.main_page}>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity onPress={handleGoBack}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.back_title_view}>
          <Text style={styles.back_text}>{category}</Text>
        </View>
        <View style={styles.standard_view}>
          <Text style={styles.standard_text}>정렬기준</Text>
        </View>
      </View>
      <View style={styles.category_post_view}>
        {filteredVotes.map((vote, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('VoteBefore', {
                category,
                isLoggedIn,
                userId,
                jwtToken,
                nickname,
                updateDM2,
              })
            }
          >
            <View style={styles.category_post_box}>
              <View style={styles.category_post_text}>
                <Text style={styles.category_post_title}>
                  {vote.title}
                </Text>
                <Text style={styles.category_post_sub}>
                  {vote.question}
                </Text>
              </View>
              <View style={styles.category_post_like}>
                <AntDesign
                  name="like2"
                  size={20}
                  color="#007BFF"
                />
                <Text
                  style={styles.category_post_like_text}
                >
                  좋아요 수 | n시간/ n분/ n일 전
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
