const getApiToken = async () => {
  const client_id = "<YOUR-CLIENT-ID>";
  const client_secret = "<YOUR-CLIENT-SECRET>";
  return axios
    .post(
      "https://salty-reef-38656.herokuapp.com/events/updateTokenFromClientCreditentials?client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
      {
        referral_code: refCode,
        email: user.email,
      },
      { headers: { "content-type": "application/json", Authorization: token } }
    )
    .then((response) => {
      return response.data.token;
    })
    .catch((error) => {
      return {};
    });
};

const signUpAvalanche = async () => {
  return axios
    .post(
      "https://salty-reef-38656.herokuapp.com/events/sign_up_by_email",
      {
        referral_code: refCode,
        email: user.email,
      },
      { headers: { "content-type": "application/json", Authorization: token } }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {};
    });
};
const PremiumEventAvalanche = async () => {
  return axios
    .post(
      "https://salty-reef-38656.herokuapp.com/events/premium_event",
      {
        email: user.email,
      },
      { headers: { "content-type": "application/json", Authorization: token } }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {};
    });
};

const GiveReward = async () => {
  return axios
    .post(
      "https://salty-reef-38656.herokuapp.com/events/v2/give_reward",
      {
        email: user.email,
      },
      { headers: { "content-type": "application/json", Authorization: token } }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {};
    });
};
