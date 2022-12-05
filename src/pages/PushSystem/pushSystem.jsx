import React from "react";
import { NotificationItem } from "@pushprotocol/uiweb";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useEffect } from "react";

const PK = "3799058fe14aacc7f303418c0cf237db942547af0edf35437a3ab8de08a2e12d"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] Welcome To DGYM:`,
        body: `[sdk-test] Get yourself fit with our proof of fitness`,
      },
      payload: {
        title: `[sdk-test] Welcome To DGYM:`,
        body: `Get yourself fit with our proof of fitness. You think you can be fit? Try dGym and get the best out of yourself.`,
        cta: "",
        img: "",
      },
      recipients: "eip155:5:0xd69c42670211857a1c4DE08633FB411C80056989", // recipient address
      channel: "eip155:5:0xd69c42670211857a1c4DE08633FB411C80056989", // your channel address
      env: "staging",
    });

    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

const PushSystem = () => {
  const [notifications, setNotifications] = React.useState();

  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await PushAPI.user.getFeeds({
        user: "eip155:5:0xd69c42670211857a1c4DE08633FB411C80056989", // user address in CAIP
        env: "staging",
      });

      setNotifications(notifications);
    };

    getNotifications();
  }, []);
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Push Notification System</h1>
        <p style={{fontWeight:'300', textAlign:'center'}}>We have really great usecase of this like notifying while sending NFT or notifying on transaction or notifying when our proof of fitness pays off good....</p>
      {/* @ts-ignore */}
      {notifications &&
        notifications.map((oneNotification, i) => {
          const {
            cta,
            title,
            message,
            app,
            icon,
            image,
            url,
            blockchain,
            notification,
          } = oneNotification;

          return (
            <NotificationItem
              key={i} // any unique id
              notificationTitle={title}
              notificationBody={message}
              cta={cta}
              app={app}
              icon={icon}
              image={image}
              url={url}
              chainName={blockchain}
              theme="light"
            />
          );
        })}

      <hr />

      <div style={{display:'flex', justifyContent:'center',alignItems:'flex-end'}}>
        <button style={{
            borderRadius: 10,
            backgroundColor: 'lightpink',
            padding: 10,
            width: '80%',
            color: 'white',
            border: 'none',
            fontSize: 20,
            cursor:'pointer'
        }} onClick={sendNotification}>Send Notification</button>
      </div>
    </div>
  );
};

export default PushSystem;
