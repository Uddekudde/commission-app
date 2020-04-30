import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../redux/actions/userActions";
//MUI
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Notifications from "@material-ui/icons/Notifications";

function NotificationsButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const notifications = useSelector((state) => state.user.notifications);
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    let unread = notifications.filter((notif) => notif.read === false).length;
    unread > 0
      ? (notificationsIcon = (
          <Badge badgeContent={unread} color="secondary">
            <Notifications color="inherit" />
          </Badge>
        ))
      : (notificationsIcon = <Notifications color="inherit" />);
  } else {
    notificationsIcon = <Notifications color="inherit" />;
  }
  let notificationMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb =
          notification.type === "reply"
            ? "replied to your offer"
            : "updated the status of your requested project";
        const time = dayjs(notification.createdAt).fromNow();
        const link =
          notification.type === "reply"
            ? `/listings/${notification.offerId}`
            : "/";

        return (
          <MenuItem
            key={notification.notificationId}
            onClick={handleClose}
            component={Link}
            to={link}
          >
            {`${notification.sender} ${verb} ${time}`}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  function handleClick(event) {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  function onMenuOpened() {
    let unreadNotificationsIds = notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  }

  return (
    <Fragment>
      <Tooltip title="notifications">
        <IconButton onClick={handleClick}>{notificationsIcon}</IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationMarkup}
      </Menu>
    </Fragment>
  );
}

export default NotificationsButton;
