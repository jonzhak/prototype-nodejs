webview1url = "https://refer-ui-two.vercel.app/"
webview2url = "https://refer-ui-two.vercel.app/referrals_shopify"

<WebView
          source={{ uri }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
              style={styles.flexContainer}
            />
          )}
        />

uri = `${webview1url}?email=${email}&name=${name}&base_url=${your_site_or_appstore}&token=${authToken}`;