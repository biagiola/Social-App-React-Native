import styled from 'styled-components';

export const Container = styled.View`
  align-items: center;
  background-color: #fff;
  padding-horizontal: 0px;
  width: 100%;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: ${props => props.width }${'px'};
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

export const UserInfoLeft = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const UserInfoRight = styled.View`
  margin-top: 8px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  font-family: 'Lato-Regular';
  color: #262626;
`;

export const PostText = styled.Text`
  font-size: 14px;
  font-family: 'Lato-Regular';
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 0px
`;

export const MenuItemIcon = styled.View`
  padding: 2px;
  padding-right: 8px;
`;

export const MenuItemText = styled.View`
  padding: 2px;
`;

export const PostImg = styled.Image`
  height: 250px;
  /* margin-top: 15px; */
`;

export const Divider = styled.View`
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  width: 92%;
  align-self: center;
  margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  padding: 2px 5px;
  background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
  font-size: 12px;
  font-family: 'Lato-Regular';
  font-weight: bold;
  color: ${props => props.active ? '#2e64e5' : '#333'};
  margin-top: 5px;
  margin-left: 5px;
`;
