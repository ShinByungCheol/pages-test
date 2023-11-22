import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { styles } from './styles';
import RNPickerSelect from 'react-native-picker-select';

export const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedGender, setSelectedGender] =
    useState(null);
  const [ageGroup, setAgeGroup] = useState('');
  const [mbti, setMbti] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] =
    useState(false);
  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };
  const placeholder = {
    label: 'MBTI',
    value: null,
  };
  const mbtis = [
    { label: 'INFP', value: 'INFP' },
    { label: 'INFJ', value: 'INFJ' },
    { label: 'INTP', value: 'INTP' },
    { label: 'INTJ', value: 'INTJ' },
    { label: 'ISFP', value: 'ISFP' },
    { label: 'ISFJ', value: 'ISFJ' },
    { label: 'ISTP', value: 'ISTP' },
    { label: 'ISTJ', value: 'ISTJ' },
    { label: 'ENFP', value: 'ENFP' },
    { label: 'ENFJ', value: 'ENFJ' },
    { label: 'ENTP', value: 'ENTP' },
    { label: 'ENTJ', value: 'ENTJ' },
    { label: 'ESFP', value: 'ESFP' },
    { label: 'ESFJ', value: 'ESFJ' },
    { label: 'ESTP', value: 'ESTP' },
    { label: 'ESTJ', value: 'ESTJ' },
  ];

  const handleSignUp = async () => {
    if (isButtonDisabled) {
      return; // If button is disabled, prevent multiple requests
    }

    setIsButtonDisabled(true); // Disable the button immediately

    if (id === nickname) {
      Alert.alert(
        '오류',
        'ID와 닉네임이 중복됩니다. 다시 입력해주세요'
      );
      setNickname('');
      setIsButtonDisabled(false); // Re-enable the button
      return;
    }
    if (nickname.length < 2) {
      Alert.alert(
        '오류',
        '닉네임은 최소 2글자 이상이어야 합니다.'
      );
      setNickname('');
      setIsButtonDisabled(false); // Re-enable the button
      return;
    }

    const userData = {
      uid: id,
      password: password,
      nickname: nickname,
      gender: selectedGender,
      age: ageGroup,
      mbti: mbti,
    };

    try {
      const response = await axios.post(
        'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/auth/signup',
        userData
      );

      if (response.status === 201) {
        console.log('회원가입 성공:', response.data);
        navigation.navigate('LoginScreen');
      } else {
        console.error('회원가입 실패:', response.data);
      }
    } catch (error) {
      Alert.alert('오류', '이미 동일한 ID가 있습니다.');
      console.error('회원가입 요청 오류:', error);
    } finally {
      // Use setTimeout to delay the reactivation of the button by 2 seconds (2000 milliseconds)
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable the button after the delay
      }, 2000);
    }
  };

  return (
    <View style={styles.main_Page1}>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginScreen')
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
          <Text style={styles.back_text}>회원가입</Text>
        </View>
      </View>
      <View style={styles.signup_page_view}>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              아이디
            </Text>
          </View>
          <TextInput
            placeholder="ID 입력 해주세요"
            value={id}
            onChangeText={(text) => setId(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              비밀번호
            </Text>
          </View>
          <TextInput
            placeholder="비밀번호는 8 ~ 12자리"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              닉네임
            </Text>
          </View>
          <TextInput
            placeholder="닉네임은 최대 7자리까지"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              성별
            </Text>
          </View>
          <View style={styles.signup_page_gender_view}>
            <TouchableOpacity
              style={[
                styles.signup_page_gender_btn,
                selectedGender === 'M'
                  ? styles.selectedGender
                  : null,
              ]}
              onPress={() => handleGenderSelection('M')}
            >
              <Text style={styles.signup_page_gender_text}>
                남
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.signup_page_gender_btn,
                selectedGender === 'W'
                  ? styles.selectedGender
                  : null,
              ]}
              onPress={() => handleGenderSelection('W')}
            >
              <Text style={styles.signup_page_gender_text}>
                여
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              나이대
            </Text>
          </View>
          <TextInput
            placeholder="                                                                "
            value={ageGroup}
            onChangeText={(text) => setAgeGroup(text)}
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              MBTI
            </Text>
          </View>
          <RNPickerSelect
            placeholder={placeholder}
            value={mbti}
            onValueChange={(itemValue) =>
              setMbti(itemValue)
            }
            items={mbtis}
            style={{
              inputIOS: styles.mbti_select_ios,
              inputAndroid: styles.mbti_select_and, // iOS 및 Android 스타일을 동일하게 유지
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSignUp}
        disabled={isButtonDisabled}
      >
        <View
          style={[
            styles.signup_page_signup_btn_view,
            {
              backgroundColor: isButtonDisabled
                ? 'gray'
                : '#0070FF',
            },
          ]}
        >
          <Text style={styles.signup_page_signup_btn_text}>
            회원 가입하기
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
