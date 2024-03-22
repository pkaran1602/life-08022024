import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Notification_table from './Notification_table';
import style from './push_notification.module.css'
import { get_pust_notifications_data, send_pust_notification } from 'src/axios/Api';
import Swal from 'sweetalert2';
import { token_expire } from 'src/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import My_Loader from 'src/components/loader/My_Loader';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaRegFaceSmile } from "react-icons/fa6";


const Push_Notification = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
  const [notification_msg, setNotification_msg] = useState("");
  const [notification_list, setNotification_list] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [notificationError, setNotificationError] = useState('');
  const [notificationError1, setNotificationError1] = useState('');
  const [wordCount, setWordCount] = useState(0); // State to hold word count

  const WordCounter = ({ count }) => {
    const emojiCount = (notification_msg.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []).length; // Count emojis
    return <div style={{color:'red'}}>{count + emojiCount}/150</div>;
  };

  const validate = (name, value) => {
    switch (name) {
      case "notification_msg":
        if (value.length === 0) {
          setNotificationError({});
        }
         else if (value.length > 200) {
          setNotificationError({ ...notificationError, notification_msg: "Name should not be more than 50 character" })
        } else {
          delete notificationError.notification_msg;
          setNotificationError(notificationError);
        }
        break;
      default:
        break
    }
  };


  const handle_change = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setNotification_msg(inputValue);
      setNotificationError('');
      setWordCount(inputValue.length); // Update word count
    } else {
      setNotificationError('Notification should not exceed 200 characters');
    }
};

  const handleEmojiSelect = (emoji) => {
    setCurrentEmoji(emoji.native);
    setNotification_msg(notification_msg + emoji.native);
    setShowEmojiPicker(!showEmojiPicker)
  };

  const formatDateTime = (dateTimeString) => {
    const dateTimeObj = new Date(dateTimeString);
    const options = { day: '2-digit', month: 'short', year: 'numeric', };
    return dateTimeObj.toLocaleString('en-IN', options).replace(/-/g, ' ').replace(',', '');
  };

  const submit_form = (e) => {
    e.preventDefault();
    if (notification_msg.trim() === '') {
      setNotificationError('Notification Text is required');
      return;
    }
    send_pust_notification({ notification_msg: notification_msg }).then((response) => {
    
      if (response.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Notification has been sent successfully",
          showConfirmButton: false,
          timer: 2000
        });
        push_notification_details()
        setNotification_msg("")
      }else if (response.status === 4) {
        dispatch(token_expire());
      }
    })
  };

  const push_notification_details = () => {
    get_pust_notifications_data().then((response) => {
      setIsLoading(false);
      if (response.status === 1) {
        const dataWithIndex = response.notification_list.map((item, index) => ({
          ...item,
          index: index + 1,
          createdAt: formatDateTime(item.createdAt),
        }));
        setNotification_list(dataWithIndex)
      } else if (response.status === 4) {
        dispatch(token_expire());
      }
    })
  };

  useEffect(() => {
    push_notification_details()
  }, []);

  return (
    <div>
      {isLoading &&
        <My_Loader />
      }
      {!isLoading &&
        <div className={style.container}>
          <div className={style.main_content}>
            <div className={style.header}>
              <span>
                Push Notifications
              </span>
            </div>
            <div className={style.content}>
              <form onSubmit={submit_form}>
                <div className={style.push_label}>
                  <label htmlFor='notification'></label>
                  <textarea 
                  style={{resize:'none'}}
                  maxLength={150}
                    type="text"
                    // required name='notification'
                    value={notification_msg}
                    onChange={handle_change} />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                      <div>

                     {notificationError && <div className='text-danger'>{notificationError}</div>}
                      </div>
                      <div>

                     <WordCounter count={wordCount} />
                      </div>
                     </div>
                  <div className={style.main_button}>
                    <div className={style.my_btn1}>
                      <Button
                        variant='outline-primary'
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <FaRegFaceSmile style={{fontSize:'25px'}} />
                      </Button>
                    <div className={showEmojiPicker ? 'd-block' : 'd-none'}>
                      <Picker
                        data={data}
                        // previewPosition="none"
                        onEmojiSelect={handleEmojiSelect}
                      />
                    </div>
                    </div>
                <div className={style.my_btn}>
                  <Button variant='outline-primary' type='submit'>Send</Button>
                </div>
                   
                  </div>  
                </div>
              </form>
            </div>
          </div>
          <div className={style.data_table}>
            <Notification_table
              data={notification_list}
            />
          </div>
        </div>
      }
    </div>
  )
};

export default Push_Notification;