import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native';
import { styles } from './styles';
import { Alert } from 'react-native';
import axios from 'axios'; // Import axios for HTTP requests
import { KeyboardAvoidingView } from 'react-native';
export const VoteAfter = ({ navigation, route }) => {
  const {
    vote,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    userVotes,
  } = route.params;

  const [updateDM5, setUpdateDM5] = useState(1); // 이동 변수

  const [comments, setComments] = useState([]); // 댓글
  const [pollOptions, setPollOptions] = useState([]);
  const newChoices = vote.choices.map((choice) => ({
    id: choice.id,
    text: choice.text,
    votes: 0, // 초기 투표 수를 0으로 설정
  }));
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentBox, setCommentBox] = useState([]);
  const [heartType, setHeartType] = useState('empty');

  const [isReplyMode, setIsReplyMode] = useState(false);

  const [showReplyInput, setShowReplyInput] =
    useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyingIndex, setReplyingIndex] = useState(null);
  const [replycommentBox, setReplycommentBox] = useState(
    []
  );

  // Check if the current user's nickname is in the likedUsers array
  useEffect(() => {
    if (
      vote.likedUsers &&
      vote.likedUsers.includes(nickname)
    ) {
      setHeartType('filled');
    }
  }, [vote, nickname]);
  //게시글 좋아요
  const handleHeartClick = async () => {
    const data = {
      pollId: vote.id,
      nickname: nickname,
    };

    console.log(data);

    try {
      const response = await axios.post(
        'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/polls/likes',
        data,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        setHeartType((prev) =>
          prev === 'empty' ? 'filled' : 'empty'
        );
      } else {
        console.error('Failed to likes:', response.data);
      }
    } catch (error) {
      console.error('게시글 좋아요 :', error);
    }

    console.log('userVotes : ', userVotes);
    console.log('vote : ', vote);
  };
  //게시글 id로 댓글 조회해서 받아오기
  useEffect(() => {
    const fetchcommentData = async () => {
      try {
        const response = await axios.get(
          'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/poll/' +
            vote.id,
          {
            headers: {
              'AUTH-TOKEN': jwtToken,
            },
          }
        );

        if (response.status === 200) {
          // Assuming the response data is an array of messages
          const messagesData = response.data;
          console.log(
            '투표 id 보내서 댓글 조회 하기',
            JSON.stringify(response.data, null, 2)
          );
          // Extracting and mapping relevant data from the response
          const formattedMessages = messagesData.map(
            (message) => ({
              id: message.id,
              writer: message.nickname,
              content: message.content,
              time: message.time,
              likes: message.likes,
            })
          );

          // Assuming response.data is an array of comments
          setComments(formattedMessages);
        } else {
          console.error(
            'Failed to fetch messages:',
            response.data
          );
        }
      } catch (error) {
        console.error('댓글 조회하기 가져오기:', error);
      }
    };
    // Call the fetchData function to fetch messages when the component mounts
    fetchcommentData();
  }, [updateDM5]);
  // 댓글 생성
  const handleCommentSubmit = async () => {
    // 유효성 검사: 댓글 내용이 비어있는지 확인
    if (!commentText.trim()) {
      alert('댓글 내용을 입력하세요.');
      return;
    }
    const commentData = {
      content: commentText,
      uid: userId,
      pollId: vote.id,
    };

    // 서버로 댓글 전송
    try {
      const response = await axios.post(
        'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/' +
          userId +
          '/' +
          vote.id,
        commentData,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 201) {
        console.log('댓글 작성 성공:', response.data);
        // Increment updateDM by 1
        setUpdateDM5(updateDM5 + 1);
        // Update commentBox state with the new comment data
        setCommentBox((prevCommentBox) => [
          ...prevCommentBox,
          response.data,
        ]);

        setCommentText(''); // 댓글 작성 후 입력창 초기화
      } else {
        console.error('댓글 작성 실패:', response.data);
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };
  //댓글 출력 창
  const Comment = ({ comment, index }) => {
    return (
      <View key={index}>
        <View style={styles.VoteAfter_View3_comment}>
          <Text style={styles.VoteAfter_View3_nickname}>
            작성자 : {comment.writer}
          </Text>
          <Text style={styles.VoteAfter_View3_commenttime}>
            작성시간: {comment.time}
          </Text>
          {/* 작성시간 */}

          <View>
            <TouchableOpacity
              style={styles.VoteAfter_View3_report}
              onPress={() => handleReportPress(index)}
            >
              <AntDesign
                name="exclamationcircleo"
                size={18}
                color="red"
              />
              <Text
                style={styles.VoteAfter_View3_report_text}
              >
                신고
              </Text>
            </TouchableOpacity>
          </View>
          {/* 신고버튼 */}
        </View>

        <View>
          <Text style={styles.VoteAfter_View3_text}>
            {comment.content}
          </Text>
        </View>
        {/* 댓글*/}

        <View style={styles.VoteAfter_View3_totalLike}>
          <TouchableOpacity
            onPress={() => commentLike(comment, index)}
          >
            <AntDesign
              name="like2"
              size={18}
              color="blue"
            />
          </TouchableOpacity>
          <Text
            style={styles.VoteAfter_View3_totalLikenumber}
          >
            {comment.likes}
          </Text>
          {/* 좋아요합계*/}

          <View>
            <TouchableOpacity
              style={styles.VoteAfter_View3_recomment}
              onPress={() =>
                handleReplyPress(comment, index)
              }
            >
              <Entypo
                name="reply"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* 답글버튼*/}
        <View style={styles.VoteBefore_View3_commentRow} />
      </View>
    );
  };
  // 댓글 좋아요~
  const commentLike = async (comment, index) => {
    console.log('comment ', comment.id);
    try {
      const response = await axios.post(
        `https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/like/${userId}/${vote.id}/${comment.id}`,
        {}, // Empty object as the request body
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );
      // Increment updateDM by 1
      setUpdateDM5(updateDM5 + 1);

      console.log('변경 전', updateDM5);
      if (response.status === 200) {
        console.log('변경 후', updateDM5);
        console.log(
          '댓글 좋아요 성공',
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.error('댓글 좋아요 실패', response.data);
      }
    } catch (error) {
      console.error('댓글 좋아요 보내기:', error);
    }
  };
  // 여기까지 좋아요~
  const handleReplyPress = (comment, index) => {
    if (replyingIndex === index) {
      // If the reply button is pressed again, reset to a regular comment
      setReplyingIndex(null);
      setReplyText('');
      setIsReplyMode(false); // Turn off reply mode
    } else {
      // Set the replying index and pre-fill the reply input with the username
      setReplyingIndex(index);
      setReplyText(`@${comment.writer} `);
      setIsReplyMode(true); // Turn on reply mode
    }
    setShowReplyInput(true);
    setCommentText(''); // Reset regular comment text
  };
  // 대댓글 작성
  const handleAddReplySubmit = async () => {
    if (replyText.trim() === '') {
      setCommentError('답글 내용을 입력하세요.');
      return;
    }
    if (!isReplyMode || replyingIndex === null) {
      console.error(
        'Invalid reply mode or replying index.'
      );
      return;
    }
    const commentData = {
      comment: replyText,
    };
    const commentId = comments[replyingIndex].id; // Get the comment ID
    console.log(commentData);
    console.log(commentId);

    // 서버로 댓글 전송
    try {
      const response = await axios.post(
        `https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/${userId}/${vote.id}/${commentId}`,
        commentData,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );
      // Increment updateDM by 1
      setUpdateDM5(updateDM5 + 1);

      if (response.status === 200) {
        console.log(
          '답글 작성 성공',
          JSON.stringify(response.data, null, 2)
        );
      } else {
        console.error('답글 작성 실패', response.data);
      }
    } catch (error) {
      console.error('답글 작성 오류~:', error, commentId);
    }
    setShowReplyInput(false);
    setReplyText('');
    setReplyingIndex(null);
    setCommentError('');
  };
  const handleReportPress = (index) => {
    // 신고 버튼 누를 때의 처리
    // index를 사용하여 해당 댓글의 상태를 업데이트 가능
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, reported: true } : comment
    );
    setComments(updatedComments);
  };
  const handleGoBack = () => {
    // navigation.goBack()을 호출하여 이전 화면으로 이동
    navigation.goBack({});
  };
  const getRecommendCount = (comment) => {
    // 해당 댓글의 추천수를 가져오는 로직을 추가
    // 댓글 객체에 추천수를 저장하고 그 값을 반환하는 방식으로 구현
    return comment.recommendCount || 0;
  };
  const handleSendMessage = (comment) => {
    //쪽지를 보내는 로직을 추가

    console.log(`Sending a message to: ${comment.author}`);
  };
  const handleLikePress = (index) => {
    // 추천 버튼 누를 때의 처리
    // index를 사용하여 해당 댓글의 상태를 업데이트 가능
    const updatedComments = comments.map((comment, i) =>
      i === index
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    setComments(updatedComments);
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' ? 'padding' : 'height'
      }
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? -90 : 10
      }
      style={styles.status_x}
    >
      <View style={styles.main_Row12}>
        <View style={styles.back_view12}>
          <TouchableOpacity onPress={handleGoBack}>
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
          </View>

          <View style={styles.text_box1}>
            <Text style={styles.VoteBefore_View1_day}>
              투표 기간 설정: {vote.createdAt}
            </Text>

            <Text style={styles.VoteBefore_View1_host}>
              주최자 : {vote.createdBy}
            </Text>
          </View>

          <View style={styles.VoteBefore_View1_row}></View>

          <Text style={styles.VoteBefore_View2_content}>
            {vote.question}
          </Text>
          {/* 본문내용 표시 */}

          {vote.choices.map((choice) => {
            const isSelectedByUser = userVotes.some(
              (userVote) => userVote.choiceId === choice.id
            );

            return (
              <View
                key={choice.id}
                style={[
                  styles.VoteBefore_View2_Votebotton2,
                  {
                    backgroundColor: isSelectedByUser
                      ? '#4B89DC'
                      : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelectedByUser
                      ? 'white'
                      : 'black',
                  }}
                >
                  {choice.text}
                </Text>
              </View>
            );
          })}

          <View>
            <Text style={styles.VoteBefore_View3_comment}>
              댓글 {comments.length}
            </Text>
          </View>
          {/* 댓글수 표시 */}

          <TouchableOpacity>
            <Text style={styles.VoteBefore_View3_Sort}>
              정렬기준
            </Text>
          </TouchableOpacity>
          {/* 댓글정렬버튼 */}
          <View style={styles.VoteBefore_View2_Row1}></View>
          {/* 댓글창 경계선 */}

          {/* 답글출력창 */}
          <View>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                index={index}
              />
            ))}
          </View>
          {/* 댓글출력창 */}

          <View>
            {commentError !== '' && (
              <Text style={styles.VoteAfter_View3_error}>
                {commentError}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.VoteAfter_View3_comment_View}>
        <View style={styles.VoteAfter_View3_comment}>
          {/* 댓글입력창 */}
          <TouchableOpacity
            onPress={() => {
              setComments([...comments, commentText]);
              setCommentText('');
            }}
          ></TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={styles.VoteAfter_View3_commenttext}
            placeholder={
              isReplyMode
                ? '답글을 입력하세요.'
                : '댓글을 입력하세요.'
            }
            value={isReplyMode ? replyText : commentText}
            onChangeText={(text) => {
              isReplyMode
                ? setReplyText(text)
                : setCommentText(text);
              setCommentError('');
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.VoteAfter_View3_textinput}
            onPress={
              isReplyMode
                ? handleAddReplySubmit
                : handleCommentSubmit
            }
          >
            <Entypo
              name="direction"
              size={24}
              color="#4B89DC"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 댓글입력창 텍스트 */}
    </KeyboardAvoidingView>
  );
};
