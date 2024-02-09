import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Notification_table from './Notification_table';
import style from './push_notification.module.css'
import { get_pust_notifications_data, send_pust_notification } from 'src/axios/Api';
import Swal from 'sweetalert2';
import { token_expire } from 'src/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import My_Loader from 'src/components/loader/My_Loader';

const Push_Notification = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
  const [notification_msg, setNotification_msg] = useState("");
  const [notification_list, setNotification_list] = useState([])

  const handle_change = (e) => {
    setNotification_msg(e.target.value)
  };

  const submit_form = (e) => {
    e.preventDefault();
    send_pust_notification({ notification_msg: notification_msg }).then((response) => {
      if (response.status === 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Notification has been sent",
          showConfirmButton: false,
          timer: 1500
        });
        push_notification_details()
        setNotification_msg("")
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
                Notifications
              </span>
            </div>
            <div className={style.content}>
              <form onSubmit={submit_form}>
                <div className={style.push_label}>
                  <label for='notification'></label>
                  <textarea placeholder='Type Your Text Here' type="text" required name='notification' value={notification_msg} onChange={handle_change} />
                </div>
                <div className={style.my_btn}>
                  <Button variant='outline-primary' type='submit'>SEND</Button>
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