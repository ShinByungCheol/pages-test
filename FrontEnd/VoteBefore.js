import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { styles } from './styles';
import { Alert } from 'react-native';

export const VoteBefore = ({ navigation, route }) => {
  const {
    category,
    vote,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;

  const [pollOptions, setPollOptions] = useState([]);

  useEffect(() => {
    // Assuming vote.choices is an array of choice objects received from the server
    setPollOptions(
      vote.choices.map((choice) => ({
        id: choice.id,
        text: choice.text,
        votes: 0,
        isSelected: false,
      }))
    );
  }, [vote]);

  const [heartType, setHeartType] = useState('empty');

  const handleHeartClick = () => {
    setHeartType((prev) =>
      prev === 'empty' ? 'filled' : 'empty'
    );
  };

  const handleVoteOption = (optionId) => {
    const updatedOptions = pollOptions.map((option) => ({
      ...option,
      isSelected: option.id === optionId,
    }));
    setPollOptions(updatedOptions);
  };

  const handleVote = () => {
    const selectedOption = pollOptions.find(
      (option) => option.isSelected
    );

    if (!selectedOption) {
      Alert.alert('알림', '투표항목을 선택해주세요');
      return;
    }

    const updatedOptions = pollOptions.map((option) =>
      option.isSelected
        ? { ...option, votes: option.votes + 1 }
        : option
    );
    setPollOptions(updatedOptions);
  };

  const handleNavigateToVoteAfter = () => {
    navigation.navigate('VoteAfter', {
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2,
    });
  };

  const home = () => {
    navigation.navigate('HomeScreen', {
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2,
    });
  };

  return (
    <View style={styles.status_x}>
      <View style={styles.main_Row12}>
        <View style={styles.back_view12}>
          <TouchableOpacity onPress={home}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.VoteBefore_View1_heart}
          >
            {heartType === 'empty' ? (
              <Entypo
                name="heart-outlined"
                size={30}
                color="black"
              />
            ) : (
              <Entypo name="heart" size={30} color="red" />
            )}
          </TouchableOpacity>
          {/* 좋아요 버튼: 클릭시 색상변경 */}
          <TouchableOpacity
            style={styles.VoteBefore_View1_share}
          >
            <Entypo name="share" size={24} color="black" />
          </TouchableOpacity>
          {/* 공유 버튼 */}
        </View>
      </View>
      <ScrollView>
        <View style={styles.VoteBefore_View1_All}>
          <View>
            <Text style={styles.VoteBefore_View1_title}>
              {vote.title}
            </Text>
            {/* 투표제목 */}
          </View>

          <View style={styles.text_box1}>
            <Text style={styles.VoteBefore_View1_day}>
              투표 기간 설정: {vote.createdAt}
            </Text>

            <Text style={styles.VoteBefore_View1_host}>
              주최자 : {vote.createdBy}
            </Text>
          </View>
          {/* 투표기간,주최자 */}

          <View style={styles.VoteBefore_View1_row}></View>
          {/* 본문경계선 */}

          <Text style={styles.VoteBefore_View2_content}>
            {vote.question}
          </Text>
          {/* 본문내용 표시 */}

          {pollOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.VoteBefore_View2_Votebotton,
                {
                  backgroundColor: option.isSelected
                    ? '#4B89DC'
                    : 'transparent',
                },
              ]}
              onPress={() => handleVoteOption(option.id)}
            >
              {option.isSelected && (
                <Entypo
                  name="check"
                  size={20}
                  color={
                    option.isSelected ? 'white' : 'dimgray'
                  }
                  style={{ marginRight: 5 }}
                />
              )}
              <Text
                style={{
                  color: option.isSelected
                    ? 'white'
                    : 'dimgray',
                }}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
          {/* 투표항목 생성버튼 */}

          <View style={styles.VoteBefore_View2_Row}></View>
          {/* 댓글창 경계선 */}

          <Text style={styles.VoteBefore_View3_comment}>
            댓글 10
          </Text>
          {/* 댓글수 표시 */}

          <View style={styles.VoteBefore_View3_warning}>
            {/* 회색바*/}

            <Text
              style={styles.VoteBefore_View3_warningtext}
            >
              투표에 참여한 사람만 댓글을 작성할 수
              있습니다.
            </Text>
            {/* 회색바 문자열 */}
          </View>

          <View>
            <TouchableOpacity
              onPress={handleNavigateToVoteAfter}
              style={styles.VoteBefore_View3_Votebotton}
            >
              {/* 투표하기버튼 */}

              <Text
                style={
                  styles.VoteBefore_View3_Votebottontext
                }
              >
                선택한 버튼으로 투표하기
              </Text>
            </TouchableOpacity>
            {/* 투표하기버튼 문자열 */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
