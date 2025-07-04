
import { NavigateFunction } from 'react-router-dom';

// Function to handle role-based navigation
export const navigateBasedOnRole = (role: string, navigate: NavigateFunction) => {
  console.log('Navigating based on role:', role);
  switch (role) {
    case 'admin':
      navigate('/admin');
      break;
    case 'teacher':
      navigate('/teacher');
      break;
    case 'parent':
      navigate('/parent');
      break;
    default:
      console.log('Unknown role, defaulting to parent dashboard');
      navigate('/parent');
      break;
  }
};
