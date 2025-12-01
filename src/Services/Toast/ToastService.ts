import Toast from 'react-native-toast-message';

export const ToastService = {
  SUCCESS: (message: string, duration: number = 4000) => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      visibilityTime: duration,
      position: 'top',
      topOffset: 50,
    });
  },

  ERROR: (message: string, duration: number = 5000) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      visibilityTime: duration,
      position: 'top',
      topOffset: 50,
    });
  },

  INFO: (message: string, duration: number = 4000) => {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      visibilityTime: duration,
      position: 'top',
      topOffset: 50,
    });
  },

  WARNING: (message: string, duration: number = 5000) => {
    Toast.show({
      type: 'warning',
      text1: 'Warning',
      text2: message,
      visibilityTime: duration,
      position: 'top',
      topOffset: 50,
    });
  },

  DISMISS: () => {
    Toast.hide();
  },
};

export default ToastService;