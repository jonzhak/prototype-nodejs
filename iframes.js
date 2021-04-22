import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Content } from "components/Layout";
import { useStore } from "store";
import jwt from "jwt-decode";

const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};
`;
const iframe1url = "https://refer-ui-two.vercel.app/";
const iframe2url = "https://refer-ui-two.vercel.app/referrals_shopify";

const PageWithIframe = () => {
  const [{ auth }] = useStore();
  const [name, setName] = useState("");
  const [showIframe, setShowIframe] = useState(false);

  const { authToken } = useAuthToken();

  const [email, setEmail] = useState("");
  useEffect(() => {
    const tokenPayload = jwt(localStorage.getItem("token"));
    console.log("token is token", tokenPayload);
    const email = tokenPayload.email;
    const name = tokenPayload.fullName;
    setEmail(email);
    setShowIframe(true);
    setName(name);
    console.log("envs are", JSON.stringify(process.env, null, 2));
  }, []);

  const useAuthToken = () => {
    const [authToken, setAuthToken] = useState("");
    async function setToken() {
      const token = await getApiToken();
      setAuthToken(token);
    }
    useEffect(() => {
      setToken();
    }, []);
    return {
      authToken,
      setAuthToken,
    };
  };
  return (
    <Content>
      <Root maxWidth="md">
        {showIframe && authToken && (
          <iframe
            sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms allow-popups"
            scrolling="no"
            height="500px"
            width="800px"
            src={`${iframe1url}?email=${email}&name=${name}&base_url=${YOUR_SITE_URL_OR_PLAYSTORE}&redirect_uri=${YOUR_SITE_URL_OR_PLAYSTORE}&token=${authToken}`}
          />
        )}

        {renderContent()}
      </Root>
    </Content>
  );
};

export default PageWithIframe;
