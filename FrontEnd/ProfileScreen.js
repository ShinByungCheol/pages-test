import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

export const ProfileScreen = ({ navigation, route }) => {
  const { userId, isLoggedIn, jwtToken, nickname, updateDM2, password, mbti } =
    route.params;

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString(); // 숫자에 천 단위 구분 기호 추가
  };
  const handleLogout = () => {
    // Perform any additional logout actions here
    navigation.navigate('LoginScreen', {
      isLoggedIn: false,
    });
    socket.onclose = (event) => {
      console.log(
        'WebSocket 연결이 닫혔습니다. 코드:',
        event.code,
        '이유:',
        event.reason
      );
    };
    return () => {
      socket.close();
    };
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <TouchableOpacity
            onPress={
              () => navigation.goBack() // 이전 화면으로 돌아가기
            }
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.header_center}>
          <Text style={styles.back_text}>개인 프로필</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout_text}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profile_infos}>
        <View style={styles.image} />
        <View style={styles.name_section}>
          <Text style={styles.user_name_text}>사용자 닉네임 : {nickname}</Text>
          <Text style={styles.email_text}>이메일 들어갈 위치 : {userId}</Text>
        </View>
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UserAuthenticationScreen', {
              isLoggedIn: true,
              userId,
              jwtToken,
              nickname,
              updateDM2,
              password,
            })
          }
        >
          <Text style={styles.button_text}>프로필 업데이트/확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.user_status_container}>
        <View style={styles.participated_vote_box}>
          <Text style={styles.status_text1}>참가한 투표</Text>
          <Text>{formatNumberWithCommas(1000)}</Text>
        </View>
        <View style={styles.generated_vote_box}>
          <Text style={styles.status_text1}>생성한 투표</Text>
          <Text>{formatNumberWithCommas(10)}</Text>
        </View>
        <View style={styles.comment_box}>
          <Text style={styles.status_text1}>댓글</Text>
          <Text>{formatNumberWithCommas(1050)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
