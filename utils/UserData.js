// userResponse.js

const generateUserResponse = (user, token) => {
  try {
    return {
      user: {
        id: user._id,
        name: user.inf.name,
        phone: user.contact.phone,
        profilePic: user.inf.profilePic,
      },
      token: token,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateUserResponse;
