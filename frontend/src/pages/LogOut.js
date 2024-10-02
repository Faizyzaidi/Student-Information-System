import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <LogoutContainer>
            <h1>{currentUser?.name}</h1> {/* Optional chaining to prevent errors */}
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonContainer>
                <StyledButtonLogout onClick={handleLogout}>Log Out</StyledButtonLogout>
                <StyledButtonCancel onClick={handleCancel}>Cancel</StyledButtonCancel>
            </ButtonContainer>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(133, 118, 159, 0.4);
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const StyledButtonLogout = styled(StyledButton)`
  background-color: #ea0606;
  
  &:hover {
    background-color: #c50505; /* Darker shade on hover */
  }
`;

const StyledButtonCancel = styled(StyledButton)`
  background-color: rgb(99, 60, 99);
  
  &:hover {
    background-color: rgb(80, 45, 80); /* Darker shade on hover */
  }
`;
