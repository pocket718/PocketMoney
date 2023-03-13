export const constant = {
    parentTheme: 'parentTheme',
    childOneTheme: 'ageGroupOneTheme',
    childTwoTheme: 'ageGroupTwoTheme',
    childThreeTheme: 'ageGroupThreeTheme',
    back: 'Back',
    click: 'Click',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    confirmPasswordText: 'Confirm Password',
    id: 'id',
    otp: 'otp',
    submit: 'submit',
    submitOtp: 'Submit OTP',
    updatePassword: 'Update Password',
    login: 'login',
    sendOtp: 'Send OTP',
  
    reset: 'Reset',
    forgotPassword: 'Forgot Password?',
    letsStart: "Let's Start,",
    loginTitle: 'Hi there!',
    resetPasswordTitle: 'Reset Password?',
    resetPasswordDescription:
      'Enter your email to receive the OTP for change of password.',
    verificationPasswordTitle: 'Verification!',
    verificationPasswordDescription: email =>
      `Enter the verification code we just sent you on your email address: ${email}`,
    newPasswordTitle: 'New Password!',
    newPasswordDescription: 'Below you have to type in your new password.',
    letsStartDesc: 'We are glad you are here!!!',
    loginSubtitle: (user = '') => `You are now logging in as a ${user}`,
    loginAs: (user = '', login) => (
      <>
        {`Want to `}
        {login} {` as a ${user}.`}
      </>
    ),
    resendOtp: (
      <>
        Didn't receive the OTP?{' '}
        <strong style={{ color: '#F0795C' }}>Resend</strong>
      </>
    ),
    redirectToLogin: (
      <>
        Back to <strong style={{ color: '#F0795C' }}>Login</strong> page
      </>
    ),
    parent: 'Guardian',
    kid: 'Kid',
    iAmGuardian: "I'm a Guardian",
    iAmKid: "I'm a Kid",
    lightButtonStyle: {
      border: '2px solid #F0795C',
      backgroundColor: '#fff',
      color: '#F0795C',
    },
    transparentButton: {
      backgroundColor: 'transparent',
      color: '#359DB6',
      border: '1.5px solid #359DB6',
      borderRadius: '12px',
    },
    routes: {
      landingPage: '/',
      accountType: '/account-type',
      parentLogin: '/parent-login',
      childrenLogin: '/children-login',
      resetPassword: '/reset-password',
      dashboard: '/',
      calendar: '/calendar',
      kidsProfile: '/kids-profile',
      guardianProfile: '/guardian-profile',
      rewards: '/rewards',
    },
    globalStyling: {
      fontFamily: 'poppins',
    },
    otpError: 'Please enter the OTP',
    passwordMatchError: "Confirm Password doesn't match",
    invalidPasswordError: 'Please enter a valid password',
    otpToken: 'otp_token',
    token: 'token',
    breakMobileAuthPoint: 852,
    breakLaptopAuthPoint: 1400,
    breakSmallMobileAuthPoint: 450,
    authButtonStyle: theme => ({
      buttonStyle: {
        [theme.breakpoints.up(constant.breakLaptopAuthPoint)]: {
          width: '34rem',
          fontSize: '1.3rem',
          padding: '2rem',
        },
        [theme.breakpoints.down(constant.breakLaptopAuthPoint)]: {
          width: '22rem',
          fontSize: '1.1rem',
          padding: '1.9rem',
        },
        [theme.breakpoints.down(constant.breakMobileAuthPoint)]: {
          width: '20rem',
          fontSize: '1.1rem',
          padding: '1.9rem',
        },
        [theme.breakpoints.down(constant.breakSmallMobileAuthPoint)]: {
          width: '14rem',
          fontSize: '1rem',
          padding: '1.4rem',
        },
      },
    }),
    loginInputStyle: theme => ({
      inputStyle: {
        [theme.breakpoints.up(constant.breakLaptopAuthPoint)]: {
          fontSize: '1.2rem',
          padding: '1.2rem 5%',
        },
        [theme.breakpoints.down(constant.breakLaptopAuthPoint)]: {
          fontSize: '1rem',
          padding: '1rem 5%',
        },
        [theme.breakpoints.down(constant.breakMobileAuthPoint)]: {
          fontSize: '1.1rem',
          padding: '1rem 5%',
        },
        [theme.breakpoints.down(constant.breakSmallMobileAuthPoint)]: {
          fontSize: '0.9rem',
          padding: '1rem 5%',
        },
      },
    }),
    loginHelperTextStyle: theme => ({
      loginHelperTextStyle: {
        fontWeight: 500,
        [theme.breakpoints.up(constant.breakLaptopAuthPoint)]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.down(constant.breakLaptopAuthPoint)]: {
          fontSize: '0.8rem',
        },
        [theme.breakpoints.down(constant.breakMobileAuthPoint)]: {
          fontSize: '0.8rem',
        },
        [theme.breakpoints.down(constant.breakSmallMobileAuthPoint)]: {
          fontSize: '0.6rem',
        },
      },
    }),
    taskList: 'Task List',
    completedTaskList: 'Completed Task List',
    kidsProfile: "Kid's Profile",
    guardiansProfile: 'Guardians Profile',
    noKidFound: 'No Kid Found',
    guardianrequest: "Kid's Request",
    cancel: 'Cancel',
    approve: 'Approve',
    transparent: 'transparent',
    filter: 'Filter',
    parentApproved: 'APPROVED',
    childApproved: 'COMPLETED',
    create: 'Create',
    createTask: 'Create Task',
    updateTask: 'Update Task Status',
    createProfile: 'Create Profile',
    profileView: 'Profile View',
    deleteProfile: 'Delete Profile',
    taskTitle: 'Task Title',
    createdStatus: 'CREATED',
    inProgress: 'IN PROGRESS',
    childApprovedStatus: 'CHILD APPROVED',
    parentApprovedStatus: 'PARENT APPROVED',
    overdueStatus: 'OVERDUE',
    addProfile: 'Add Profile',
  };
  
