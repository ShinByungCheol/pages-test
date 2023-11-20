import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export const ProfileUpdateScreen = ({ navigation, route }) => {
  const { userId, isLoggedIn, jwtToken, nickname, updateDM2, password, mbti } =
    route.params;

  const [newPassword, setNewPassword] = useState('');
  const [newMbti, setNewMbti] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.uri);

      // 이미지 선택 후 바로 업로드
      let formData = new FormData();
      formData.append('name', 'avatar');
      formData.append('fileData', {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'upload.jpeg',
      });

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .post('<IMAGE_UPLOAD_ENDPOINT>', formData, config)
        .then((response) => {
          console.log('upload success', response);
        })
        .catch((error) => {
          console.log('upload error', error);
        });
    }
  };

  const handleChangePassword = async () => {
    const password = {
      uid: userId,
      password: newPassword,
    };
    if (newPassword === '') {
      Alert.alert('알림', '비밀번호를 입력해주세요');
      return;
    }
    try {
      // Call your API or service to change the password
      const response = await axios.patch(
        'http://port-0-capstone-project-gj8u2llon19kg3.sel5.cloudtype.app/auth/patch/' +
          userId,
        password,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        // Assuming the API returns an object with a 'success' property
        Alert.alert('알림', '비밀번호 변경 완료');
      } else {
        Alert.alert('알림', '비밀번호 변경에 실패했습니다');
      }
    } catch (error) {
      console.error('Password change failed:', error);
      Alert.alert(
        '알림',
        '비밀번호 변경에 실패했습니다.\n네트워크 상태를 확인해주세요.'
      );
    }
  };

  const handleChangeMbti = async () => {
    const mbti = {
      uid: userId,
      mbti: newMbti,
    };
    if (newMbti === '') {
      Alert.alert('알림', 'MBTI를 입력해주세요');
      return;
    }
    try {
      const response = await axios.patch(
        'http://port-0-capstone-project-gj8u2llon19kg3.sel5.cloudtype.app/auth/patch/' +
          userId,
        mbti,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        Alert.alert('알림', 'MBTI 변경 완료');
      } else {
        Alert.alert('알림', 'MBTI 변경에 실패했습니다');
      }
    } catch (error) {
      console.error('MBTI change failed:', error);
      Alert.alert(
        '알림',
        'MBTI 변경에 실패했습니다.\n네트워크 상태를 확인해주세요.'
      );
    }
  };

  const handleChangeNickname = async () => {
    const nickname = {
      uid: userId,
      nickname: newNickname,
    };
    if (newNickname === '') {
      Alert.alert('알림', '닉네임을 입력해주세요');
      return;
    }
    try {
      const response = await axios.patch(
        'http://port-0-capstone-project-gj8u2llon19kg3.sel5.cloudtype.app/auth/patch/' +
          userId,
        nickname,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        Alert.alert('알림', '닉네임 변경 완료');
      } else {
        Alert.alert('알림', '닉네임 변경에 실패했습니다');
      }
    } catch (error) {
      console.error('Nickname change failed:', error);
      Alert.alert(
        '알림',
        '닉네임 변경에 실패했습니다.\n네트워크 상태를 확인해주세요.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileScreen', {
                isLoggedIn: true,
                userId,
                jwtToken,
                nickname: newNickname || nickname, // If the nickname has been changed, pass the new one. Otherwise, pass the old one.
                password: newPassword || password, // If the password has been changed, pass the new one. Otherwise, pass the old one.
                mbti: newMbti || mbti, // If the MBTI has been changed, pass the new one. Otherwise, pass the old one.
              })
            }
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.header_center}>
          <Text style={styles.back_text}>개인 프로필 수정</Text>
        </View>
        <View style={styles.header_right}></View>
      </View>

      <View style={styles.profile_infos}>
        <TouchableOpacity onPress={handleImageSelection}>
          <View style={styles.image} />
        </TouchableOpacity>
        <View style={styles.name_section}>
          <Text style={styles.user_name_text}>{nickname}</Text>
          <Text style={styles.email_text}>{userId}</Text>
        </View>
      </View>

      <View style={styles.text_input_container}>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>신규 비밀번호</Text>
          </View>
          <TextInput
            placeholder="변경할 비밀번호를 입력해주세요"
            style={styles.signup_page_inputfield}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        <View style={styles.update_button_container}>
          <TouchableOpacity
            style={styles.update_button}
            onPress={handleChangePassword}
          >
            <Text style={styles.button_text}>비밀번호 변경하기</Text>
          </TouchableOpacity>
        </View>

        <Text>{'\n'}</Text>

        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>MBTI</Text>
          </View>
          <TextInput
            placeholder="바뀌었다면 재입력 가능하게"
            style={styles.signup_page_inputfield}
            value={newMbti}
            onChangeText={(text) => setNewMbti(text)}
          />
        </View>
        <View style={styles.update_button_container}>
          <TouchableOpacity
            style={styles.update_button}
            onPress={handleChangeMbti}
          >
            <Text style={styles.button_text}>MBTI 변경하기</Text>
          </TouchableOpacity>
        </View>

        <Text>{'\n'}</Text>

        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>변경할 닉네임</Text>
          </View>
          <TextInput
            placeholder="변경하고싶은 닉네임을 넣어주세요"
            style={styles.signup_page_inputfield}
            value={newNickname}
            onChangeText={(text) => setNewNickname(text)}
          />
        </View>
        <View style={styles.update_button_container}>
          <TouchableOpacity
            style={styles.update_button}
            onPress={handleChangeNickname}
          >
            <Text style={styles.button_text}>닉네임 변경하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
