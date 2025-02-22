"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const NotificationItem = ({ notification }: { notification: any }) => {
  const [isRead, setIsRead] = useState(notification.read);
  const { isDark } = useTheme();

  const markAsRead = () => {
    setIsRead(true);
  };

  return (
    <button
      onClick={markAsRead}
      className={`w-full p-3 rounded-lg transition-colors text-left ${
        !isRead
          ? isDark
            ? "bg-blue-900/20 hover:bg-blue-900/30"
            : "bg-blue-50 hover:bg-blue-100"
          : isDark
          ? "hover:bg-gray-700"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4
            className={`font-medium ${
              !isRead
                ? isDark
                  ? "text-blue-400"
                  : "text-blue-600"
                : isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {notification.title}
          </h4>
          <p
            className={`text-sm ${
              !isRead
                ? isDark
                  ? "text-blue-300"
                  : "text-blue-600"
                : isDark
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {notification.message}
          </p>
        </div>
        <span
          className={`text-xs ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {notification.date}
        </span>
      </div>
    </button>
  );
};

export default NotificationItem;