import { store } from "react-notifications-component";
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css';

type PropsType = {
  title: string;
  message: string;
  type: "success" | "danger" | "info" | "default" | "warning";
}

export function Notification(props: PropsType) {
  store.addNotification({
    title: props.title,
    message: props.message,
    type: props.type,
    insert: "bottom",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__zoomOut"],
    dismiss: {
      duration: 5000,
    }
  })
}