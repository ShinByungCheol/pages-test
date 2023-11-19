import React, { useState } from 'react';
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
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  const [title] = useState('투표 수행전 투표메인화면');
  const [description, setDescription] = useState(
    '본문내용이 여기에 들어갑니다.'
  );
  const [host] = useState('주최: 레이아웃 테스터');
  const [comments, setComments] = useState([]);

  const [pollOptions, setPollOptions] = useState([
    {
      id: 1,
      text: '투표항목1',
      votes: 0,
      isSelected: false,
    },
    {
      id: 2,
      text: '투표항목2',
      votes: 0,
      isSelected: false,
    },
    {
      id: 3,
      text: '투표항목3',
      votes: 0,
      isSelected: false,
    },
    {
      id: 4,
      text: '투표항목4',
      votes: 0,
      isSelected: false,
    },
  ]);
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
    {
      /* 아무것도 투표안하고 버튼클릭시 경고문구*/
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
    console.log(
      '다시 home으로 ',
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2
    );
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
      <ScrollView>
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
                <Entypo
                  name="heart"
                  size={30}
                  color="red"
                />
              )}
            </TouchableOpacity>
            {/* 좋아요 버튼: 클릭시 색상변경 */}
            <TouchableOpacity
              style={styles.VoteBefore_View1_share}
            >
              <Entypo
                name="share"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {/* 공유 버튼 */}
          </View>
        </View>
        <View style={styles.VoteBefore_View1_All}>
          <View>
            <Text style={styles.VoteBefore_View1_title}>
              {title}
            </Text>
            {/* 투표제목 */}
          </View>

          <View style={styles.text_box1}>
            <Text style={styles.VoteBefore_View1_day}>
              투표 기간 설정:
            </Text>

            <Text style={styles.VoteBefore_View1_host}>
              {host}
            </Text>
          </View>
          {/* 투표기간,주최자 */}

          <View style={styles.VoteBefore_View1_row}></View>
          {/* 본문경계선 */}

          <Text style={styles.VoteBefore_View2_content}>
            {description}
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
